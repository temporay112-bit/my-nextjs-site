/**
 * Privacy-safe Google Analytics 4 (GA4) event tracker.
 * Strictly adheres to privacy guidelines: never passes personal customer details,
 * message contents, or file binaries to analytics providers.
 */

export type AnalyticsEventName =
  | "quote_cta_click"
  | "inquiry_start"
  | "inquiry_submit"
  | "upload_start"
  | "upload_success"
  | "upload_error";

interface AnalyticsEventParams {
  category?: string;
  file_type?: string;
  file_size_category?: string; // e.g. "<5MB", "5-15MB", "15-25MB"
  has_techpack?: boolean;
  status?: "success" | "error";
  error_type?: string;
  source_section?: string;
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams
): void {
  if (typeof window === "undefined") return;

  // Window with optional dataLayer or gtag
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (type: string, name: string, options?: Record<string, unknown>) => void;
  };

  const safePayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  };

  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, params as Record<string, unknown>);
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push(safePayload);
    }
  } catch (err) {
    // Non-blocking telemetry
    console.debug("[Analytics] Event dispatch non-critical:", err);
  }
}
