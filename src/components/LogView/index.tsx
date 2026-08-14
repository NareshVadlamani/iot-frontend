"use client";

import { HistoryLogMessage } from "@/src/app/actions/history";
import { useState } from "react";

interface LogDetailViewProps {
  log: HistoryLogMessage;
  onBack?: () => void;
}

export default function LogDetailView({ log, onBack }: LogDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "json">("overview");

  const { eventId, reason, imageUrl, ...extraData } = log || {};

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#f4f4f5",
      }}
    >
      {/* Navigation Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#a1a1aa",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ← Back to All Logs
          </button>
        )}
        <span
          style={{
            color: "#71717a",
            fontSize: "13px",
            fontFamily: "monospace",
          }}
        >
          LOG_ID: {eventId || "N/A"}
        </span>
      </div>

      {/* Main Product-Style Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "32px",
          background: "#09090b",
          border: "1px solid #27272a",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* LEFT COLUMN: Large Hero Image Viewer */}
        <div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "420px",
              backgroundColor: "#18181b",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #27272a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Log Event Capture"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div style={{ textAlign: "center", color: "#52525b" }}>
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  No visual payload attached
                </p>
              </div>
            )}
          </div>

          {imageUrl && (
            <div style={{ marginTop: "12px", textAlign: "right" }}>
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#60a5fa",
                  fontSize: "12px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                View Full Resolution ↗
              </a>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product Information */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Top Status & Timestamp */}

            {/* Product Title / Log Message */}
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "1.3",
                margin: "0 0 16px 0",
                color: "#ffffff",
              }}
            >
              Some message
            </h1>

            {/* Highlight Box / Primary Reason */}
            {reason && (
              <div
                style={{
                  background: "#18181b",
                  borderLeft: "4px solid #3b82f6",
                  border: "1px solid #27272a",
                  borderLeftWidth: "4px",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    color: "#a1a1aa",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  Primary Reason / Cause
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#f4f4f5",
                    marginTop: "4px",
                  }}
                >
                  {reason}
                </div>
              </div>
            )}

            {/* View Switcher Tabs */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                borderBottom: "1px solid #27272a",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={() => setActiveTab("overview")}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === "overview"
                      ? "2px solid #3b82f6"
                      : "2px solid transparent",
                  color: activeTab === "overview" ? "#3b82f6" : "#a1a1aa",
                  paddingBottom: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("json")}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === "json"
                      ? "2px solid #3b82f6"
                      : "2px solid transparent",
                  color: activeTab === "json" ? "#3b82f6" : "#a1a1aa",
                  paddingBottom: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Raw JSON
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {eventId && (
                  <div
                    style={{
                      background: "#18181b",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #27272a",
                    }}
                  >
                    <div
                      style={{
                        color: "#71717a",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      EVENT ID
                    </div>
                    <code
                      style={{
                        fontSize: "13px",
                        color: "#e4e4e7",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {eventId}
                    </code>
                  </div>
                )}
                {log.eventId && (
                  <div
                    style={{
                      background: "#18181b",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #27272a",
                    }}
                  >
                    <div
                      style={{
                        color: "#71717a",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      LOG RECORD ID
                    </div>
                    <code
                      style={{
                        fontSize: "13px",
                        color: "#e4e4e7",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {log.eventId}
                    </code>
                  </div>
                )}

                {/* Additional Dynamic Metadata Key-Values */}
                {Object.entries(extraData).map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      background: "#18181b",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #27272a",
                    }}
                  >
                    <div
                      style={{
                        color: "#71717a",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {key}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#e4e4e7",
                        marginTop: "4px",
                      }}
                    >
                      {typeof val === "object"
                        ? JSON.stringify(val)
                        : String(val)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <pre
                style={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  padding: "16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  overflowX: "auto",
                  maxHeight: "200px",
                  color: "#a1a1aa",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  marginBottom: "24px",
                }}
              >
                {JSON.stringify(log, null, 2)}
              </pre>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              borderTop: "1px solid #27272a",
              paddingTop: "20px",
            }}
          >
            <button
              onClick={handleCopyJson}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.4)",
              }}
            >
              {copied ? "✓ Copied Log Data" : "Copy Log Payload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
