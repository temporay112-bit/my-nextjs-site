"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  UploadCloud,
  FileCheck,
  AlertCircle,
  X,
  RefreshCw,
  FileText,
  Plus,
  Image as ImageIcon,
  Archive,
  Layers,
} from "lucide-react";
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILES_PER_INQUIRY,
  MAX_TOTAL_UPLOAD_SIZE_BYTES,
  ALLOWED_FILE_EXTENSIONS,
  validateFileMetadata,
  type InquiryFileItem,
} from "@/lib/validations";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface UploadedFileState {
  id: string;
  file: File;
  name: string;
  size: number;
  ext: string;
  status: "uploading" | "success" | "error";
  progress: number;
  errorMessage?: string;
  pathname?: string;
  url?: string;
}

interface FileUploadProps {
  onFilesChanged?: (files: InquiryFileItem[]) => void;
  onFileUploaded?: (fileReference: string | null, originalName: string | null) => void;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onFilesChanged,
  onFileUploaded,
  disabled = false,
  className,
}: FileUploadProps) {
  const [fileList, setFileList] = useState<UploadedFileState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const onFilesChangedRef = useRef(onFilesChanged);
  const onFileUploadedRef = useRef(onFileUploaded);
  const prevSerializedRef = useRef<string>("");

  // Keep callback refs fresh
  useEffect(() => {
    onFilesChangedRef.current = onFilesChanged;
    onFileUploadedRef.current = onFileUploaded;
  }, [onFilesChanged, onFileUploaded]);

  // Sync with parent only when the list of successfully uploaded files actually changes
  useEffect(() => {
    const successFiles = fileList.filter((f) => f.status === "success" && f.pathname);
    const serialized = successFiles
      .map((f) => `${f.pathname}:${f.name}:${f.size}`)
      .join("|");

    if (serialized === prevSerializedRef.current) {
      return;
    }

    prevSerializedRef.current = serialized;

    const mapped: InquiryFileItem[] = successFiles.map((f) => ({
      pathname: f.pathname!,
      originalName: f.name,
      size: f.size,
      mimeType: f.file.type,
      uploadedAt: new Date().toISOString(),
    }));

    if (onFilesChangedRef.current) {
      onFilesChangedRef.current(mapped);
    }

    if (onFileUploadedRef.current) {
      if (mapped.length === 0) {
        onFileUploadedRef.current(null, null);
      } else if (mapped.length === 1) {
        onFileUploadedRef.current(mapped[0].pathname, mapped[0].originalName);
      } else {
        onFileUploadedRef.current(JSON.stringify(mapped), `${mapped.length} Tech Pack Files`);
      }
    }
  }, [fileList]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(0) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (ext: string) => {
    const lower = ext.toLowerCase();
    if (lower === ".pdf") return <FileText className="w-5 h-5 text-red-400" />;
    if ([".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(lower)) {
      return <ImageIcon className="w-5 h-5 text-[#60A5FA]" />;
    }
    if ([".ai", ".psd"].includes(lower)) {
      return <Layers className="w-5 h-5 text-[#F59E0B]" />;
    }
    if (lower === ".zip") return <Archive className="w-5 h-5 text-[#A855F7]" />;
    return <FileText className="w-5 h-5 text-light-grey" />;
  };

  const uploadSingleFile = useCallback((item: UploadedFileState) => {
    const validation = validateFileMetadata(item.file.name, item.file.size, item.file.type);
    if (!validation.isValid) {
      setFileList((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, status: "error", progress: 0, errorMessage: validation.error || "File invalid." }
            : f
        )
      );
      trackEvent("upload_error", { status: "error", error_type: "client_validation" });
      return;
    }

    setFileList((prev) =>
      prev.map((f) =>
        f.id === item.id ? { ...f, status: "uploading", progress: 10, errorMessage: undefined } : f
      )
    );

    const formData = new FormData();
    formData.append("file", item.file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.min(95, Math.round((event.loaded / event.total) * 90) + 5);
        setFileList((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, progress: percent } : f))
        );
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          const pathname = response.pathname || response.fileReference || response.url;
          if (pathname) {
            setFileList((prev) =>
              prev.map((f) =>
                f.id === item.id
                  ? {
                      ...f,
                      status: "success",
                      progress: 100,
                      pathname,
                      url: response.url,
                    }
                  : f
              )
            );
            trackEvent("upload_success", { status: "success", file_type: item.ext });
          } else {
            throw new Error(response.error || "Upload failed.");
          }
        } catch (e: any) {
          setFileList((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? {
                    ...f,
                    status: "error",
                    progress: 0,
                    errorMessage: e.message || "Invalid upload response.",
                  }
                : f
            )
          );
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          setFileList((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? {
                    ...f,
                    status: "error",
                    progress: 0,
                    errorMessage: errRes.error || "File upload failed.",
                  }
                : f
            )
          );
        } catch {
          setFileList((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? {
                    ...f,
                    status: "error",
                    progress: 0,
                    errorMessage: "File upload failed. Please try again.",
                  }
                : f
            )
          );
        }
      }
    });

    xhr.addEventListener("error", () => {
      setFileList((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, status: "error", progress: 0, errorMessage: "Network error during upload." }
            : f
        )
      );
    });

    xhr.addEventListener("abort", () => {
      setFileList((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, status: "error", progress: 0, errorMessage: "Upload cancelled." }
            : f
        )
      );
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  }, []);

  const handleAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setGlobalError(null);
      const incoming = Array.from(newFiles);

      if (incoming.length === 0) return;

      if (fileList.length + incoming.length > MAX_FILES_PER_INQUIRY) {
        setGlobalError(
          `Maximum ${MAX_FILES_PER_INQUIRY} files allowed per inquiry (you currently have ${fileList.length}, attempted adding ${incoming.length}).`
        );
        return;
      }

      // Check cumulative size
      const currentTotal = fileList.reduce((sum, f) => sum + f.size, 0);
      const incomingTotal = incoming.reduce((sum, f) => sum + f.size, 0);
      if (currentTotal + incomingTotal > MAX_TOTAL_UPLOAD_SIZE_BYTES) {
        setGlobalError(
          `Total upload size exceeds the 100MB maximum limit. Current: ${formatFileSize(
            currentTotal
          )}, Selected: ${formatFileSize(incomingTotal)}.`
        );
        return;
      }

      const createdItems: UploadedFileState[] = incoming.map((file) => {
        const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
        return {
          id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          file,
          name: file.name,
          size: file.size,
          ext,
          status: "uploading",
          progress: 10,
        };
      });

      setFileList((prev) => [...prev, ...createdItems]);

      // Trigger upload for each new file
      createdItems.forEach((item) => {
        uploadSingleFile(item);
      });
    },
    [fileList, uploadSingleFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
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
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFileList((prev) => prev.filter((f) => f.id !== id));
  };

  const retryFile = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const item = fileList.find((f) => f.id === id);
    if (item) {
      uploadSingleFile(item);
    }
  };

  const hasFiles = fileList.length > 0;
  const isAllUploaded = fileList.length > 0 && fileList.every((f) => f.status === "success");

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white">
          UPLOAD TECH PACKS &amp; DESIGN FILES{" "}
          <span className="text-technical-grey font-normal normal-case">(Optional — up to 10 files)</span>
        </label>
        {hasFiles && (
          <span className="text-[11px] font-barlow font-bold uppercase text-electric-lime px-2 py-0.5 bg-slots-black border border-carbon-grey/80 rounded">
            {fileList.length} / {MAX_FILES_PER_INQUIRY} Files
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_FILE_EXTENSIONS.join(",")}
        onChange={handleFileChange}
        disabled={disabled}
        className="sr-only"
        id="tech-pack-multi-upload-input"
        aria-label="Upload Tech Packs or Design Files"
      />

      {/* Drop Zone Box (Empty state or Add more state) */}
      {fileList.length < MAX_FILES_PER_INQUIRY && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled) {
              fileInputRef.current?.click();
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-controls="tech-pack-multi-upload-input"
          aria-disabled={disabled}
          className={cn(
            "relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime select-none",
            isDragging
              ? "border-electric-lime bg-graphite/90 scale-[0.99]"
              : "border-carbon-grey/80 bg-slots-black/60 hover:bg-graphite/80 hover:border-light-grey/40",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-carbon-grey/60 border border-carbon-grey/80 text-light-grey flex items-center justify-center mb-2 group-hover:text-electric-lime transition-colors">
              {hasFiles ? <Plus className="w-5 h-5 stroke-[2] text-electric-lime" /> : <UploadCloud className="w-5 h-5 stroke-[1.75]" />}
            </div>
            <p className="font-sora text-xs sm:text-sm font-bold text-slots-white">
              {hasFiles ? (
                <>
                  <span className="text-electric-lime underline underline-offset-2">Click to add more files</span> or drag and drop
                </>
              ) : (
                <>
                  <span className="text-electric-lime underline underline-offset-2">Click to select files</span> or drag and drop
                </>
              )}
            </p>
            <p className="font-inter text-[11px] text-technical-grey mt-1">
              Supports multi-file: PDF, AI, PSD, PNG, JPG, WEBP or ZIP (Max 25MB per file, 100MB total)
            </p>
          </div>
        </div>
      )}

      {/* Global Error Notice */}
      {globalError && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <span>{globalError}</span>
        </div>
      )}

      {/* File Items List */}
      {hasFiles && (
        <div className="space-y-2 pt-1">
          {fileList.map((item, idx) => {
            const isUploading = item.status === "uploading";
            const isSuccess = item.status === "success";
            const isError = item.status === "error";

            return (
              <div
                key={item.id}
                className={cn(
                  "p-3 rounded-xl border transition-all duration-200 flex flex-col gap-2",
                  isSuccess
                    ? "bg-[#121212] border-carbon-grey/80"
                    : isError
                    ? "bg-red-950/20 border-red-500/40"
                    : "bg-graphite border-carbon-grey"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-slots-black border border-carbon-grey/80 flex items-center justify-center flex-shrink-0">
                      {getFileIcon(item.ext)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-technical-grey font-bold">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <p className="font-sora text-xs font-bold text-slots-white truncate" title={item.name}>
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] font-inter text-technical-grey">
                        <span>{formatFileSize(item.size)}</span>
                        <span>&bull;</span>
                        {isSuccess && (
                          <span className="text-electric-lime flex items-center gap-1 font-semibold">
                            <FileCheck className="w-3 h-3" /> Ready
                          </span>
                        )}
                        {isUploading && (
                          <span className="text-light-grey flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full border border-electric-lime border-t-transparent animate-spin" />
                            Uploading {item.progress}%
                          </span>
                        )}
                        {isError && (
                          <span className="text-red-400 font-semibold truncate max-w-[220px]">
                            {item.errorMessage || "Upload failed"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {isError && (
                      <button
                        type="button"
                        onClick={(e) => retryFile(item.id, e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-carbon-grey hover:bg-carbon-grey/80 border border-light-grey/20 text-[11px] font-sora font-semibold text-slots-white transition-colors"
                        title="Retry upload"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => removeFile(item.id, e)}
                      className="w-7 h-7 rounded-full bg-slots-black hover:bg-red-950/60 border border-carbon-grey hover:border-red-500/50 text-technical-grey hover:text-red-400 flex items-center justify-center transition-colors"
                      title="Remove file"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar for Uploading */}
                {isUploading && (
                  <div className="w-full bg-carbon-grey/70 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-electric-lime h-1 rounded-full transition-all duration-200"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
