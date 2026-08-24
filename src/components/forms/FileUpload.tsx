"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, FileCheck, AlertCircle, X, RefreshCw } from "lucide-react";
import { MAX_FILE_SIZE_BYTES, ALLOWED_FILE_EXTENSIONS, validateFileMetadata } from "@/lib/validations";
import { trackEvent } from "@/lib/analytics";
import { upload } from "@vercel/blob/client";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileUploaded: (fileReference: string | null, originalName: string | null) => void;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({ onFileUploaded, disabled = false, className }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileReference, setFileReference] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(0) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const uploadFile = useCallback(
    async (file: File) => {
      const validation = validateFileMetadata(file.name, file.size, file.type);
      if (!validation.isValid) {
        setUploadStatus("error");
        setErrorMessage(validation.error || "This file type is not supported.");
        trackEvent("upload_error", { status: "error", error_type: "client_validation" });
        return;
      }

      setUploadStatus("uploading");
      setUploadProgress(10);
      setErrorMessage(null);

      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      const sizeCat = file.size < 5 * 1024 * 1024 ? "<5MB" : file.size < 15 * 1024 * 1024 ? "5-15MB" : "15-25MB";
      trackEvent("upload_start", { file_type: ext, file_size_category: sizeCat });

      try {
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();

        const uploadPromise = new Promise<{ url: string; pathname?: string; filename?: string }>(
          (resolve, reject) => {
            xhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) {
                const percent = Math.min(95, Math.round((event.loaded / event.total) * 90) + 5);
                setUploadProgress(percent);
              }
            });

            xhr.addEventListener("load", () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const response = JSON.parse(xhr.responseText);
                  if (response.url || response.pathname) {
                    resolve(response);
                  } else {
                    reject(new Error(response.error || "Upload failed."));
                  }
                } catch {
                  reject(new Error("Invalid upload server response."));
                }
              } else {
                try {
                  const errRes = JSON.parse(xhr.responseText);
                  reject(new Error(errRes.error || "File upload failed."));
                } catch {
                  reject(new Error("File upload failed. Please try again."));
                }
              }
            });

            xhr.addEventListener("error", () => {
              reject(new Error("Network error during file upload."));
            });

            xhr.addEventListener("abort", () => {
              reject(new Error("File upload was cancelled."));
            });

            xhr.open("POST", "/api/upload");
            xhr.send(formData);
          }
        );

        const result = await uploadPromise;
        const fileRef = result.url || result.pathname || "";
        setFileReference(fileRef);
        setUploadProgress(100);
        setUploadStatus("success");
        onFileUploaded(fileRef, file.name);
        trackEvent("upload_success", { status: "success", file_type: ext });
      } catch (err: unknown) {
        console.error("[Tech Pack Upload Error]:", err);
        const msg =
          err instanceof Error
            ? err.message.includes("larger")
              ? "This file is larger than the allowed limit."
              : err.message.includes("type")
              ? "This file type is not supported."
              : err.message
            : "File upload failed. Please try again.";

        setUploadStatus("error");
        setErrorMessage(msg);
        onFileUploaded(null, null);
        trackEvent("upload_error", { status: "error", error_type: "network_or_blob" });
      }
    },
    [onFileUploaded]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && uploadStatus !== "uploading") {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled || uploadStatus === "uploading") return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileReference(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileUploaded(null, null);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <label className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2">
        UPLOAD TECH PACK / DESIGN FILE <span className="text-technical-grey font-normal normal-case">(Optional)</span>
      </label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_FILE_EXTENSIONS.join(",")}
        onChange={handleFileChange}
        disabled={disabled || uploadStatus === "uploading"}
        className="sr-only"
        id="tech-pack-upload-input"
        aria-label="Upload Tech Pack or Design File"
      />

      {/* Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (uploadStatus !== "uploading" && !disabled) {
            fileInputRef.current?.click();
          }
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && uploadStatus !== "uploading" && !disabled) {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-controls="tech-pack-upload-input"
        aria-disabled={disabled || uploadStatus === "uploading"}
        className={cn(
          "relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime select-none",
          isDragging
            ? "border-electric-lime bg-graphite/90"
            : uploadStatus === "error"
            ? "border-red-500/60 bg-red-950/20"
            : uploadStatus === "success"
            ? "border-electric-lime/60 bg-graphite"
            : "border-carbon-grey/70 bg-graphite/60 hover:bg-graphite hover:border-light-grey/40",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        {/* State: Upload Success */}
        {uploadStatus === "success" && selectedFile && (
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <p className="font-sora text-xs font-bold text-slots-white truncate max-w-[200px] sm:max-w-[280px]">
                  {selectedFile.name}
                </p>
                <p className="font-inter text-[11px] text-electric-lime flex items-center gap-1.5 mt-0.5">
                  <span>File uploaded successfully. ({formatFileSize(selectedFile.size)})</span>
                  <span className="w-1 h-1 rounded-full bg-electric-lime" />
                  <span className="text-technical-grey">Ready</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="w-8 h-8 rounded-full bg-carbon-grey/80 hover:bg-red-900/40 border border-light-grey/10 hover:border-red-500/50 text-technical-grey hover:text-red-400 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              title="Remove file"
              aria-label="Remove uploaded file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* State: Uploading In-Progress */}
        {uploadStatus === "uploading" && selectedFile && (
          <div className="flex flex-col items-center justify-center w-full py-2">
            <div className="w-8 h-8 rounded-full border-2 border-electric-lime border-t-transparent animate-spin mb-3" />
            <p className="font-sora text-xs font-bold text-slots-white">
              Uploading your file... ({uploadProgress}%)
            </p>
            <div className="w-48 bg-carbon-grey rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-electric-lime h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="font-inter text-[11px] text-technical-grey mt-1">
              Direct secure upload to Vercel Blob storage
            </p>
          </div>
        )}

        {/* State: Upload Error */}
        {uploadStatus === "error" && (
          <div className="flex flex-col items-center text-center w-full py-1">
            <div className="w-9 h-9 rounded-full bg-red-900/30 border border-red-500/40 text-red-400 flex items-center justify-center mb-2">
              <AlertCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <p className="font-sora text-xs font-bold text-red-400">
              {errorMessage || "File upload failed. Please try again."}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-carbon-grey hover:bg-carbon-grey/80 border border-light-grey/20 text-xs font-sora font-semibold text-slots-white transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Upload</span>
              </button>
              <button
                type="button"
                onClick={removeFile}
                className="text-xs font-inter text-technical-grey hover:text-light-grey underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* State: Idle / Ready to select */}
        {uploadStatus === "idle" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-carbon-grey/60 border border-carbon-grey/80 text-light-grey flex items-center justify-center mb-2 group-hover:text-electric-lime transition-colors">
              <UploadCloud className="w-5 h-5 stroke-[1.75]" />
            </div>
            <p className="font-sora text-xs sm:text-sm font-bold text-slots-white">
              <span className="text-electric-lime underline underline-offset-2">Click to upload</span> or drag and drop
            </p>
            <p className="font-inter text-[11px] text-technical-grey mt-1">
              PDF, JPG, PNG, WEBP or ZIP (Max 25MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
