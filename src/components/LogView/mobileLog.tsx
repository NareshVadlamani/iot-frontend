"use client";

import { HistoryLogMessage } from "@/src/app/actions/history";
import { useState } from "react";

interface MobileLogDetailProps {
  log: HistoryLogMessage;
  onBack?: () => void;
}

export default function MobileLogDetail({ log, onBack }: MobileLogDetailProps) {
  const [copied, setCopied] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const { eventId, reason, imageUrl, ...extraData } = log || {};

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24">
      <div className="sticky top-0 z-1 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
        >
          ← Back
        </button>
        <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[150px]">
          ID: {log.eventId || "N/A"}
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Full-Width Hero Image Container */}
        <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl flex items-center justify-center">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="Log capture preview"
                className="w-full h-full object-cover"
              />
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2 right-2 bg-zinc-950/80 backdrop-blur text-xs text-blue-400 border border-zinc-700/80 px-2.5 py-1 rounded-md font-medium"
              >
                Expand ↗
              </a>
            </>
          ) : (
            <div className="text-center text-zinc-600 text-xs">
              <p>No image payload available</p>
            </div>
          )}
        </div>

        {/* Status Badge & Timestamp */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">
            {log.createdAt &&
              new Date(log.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
          </span>
        </div>

        {/* Log Title */}
        <h1 className="text-lg font-bold text-white leading-snug">
          {log.reason}
        </h1>

        {/* Highlight Card: Reason */}
        {reason && (
          <div className="bg-zinc-900/80 border-l-4 border-l-blue-500 border border-zinc-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Primary Reason
            </span>
            <p className="text-sm font-semibold text-zinc-100">{reason}</p>
          </div>
        )}

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-2 gap-2">
          {eventId && (
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Event ID
              </span>
              <span className="text-xs font-mono text-zinc-200 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50">
                {eventId}
              </span>
            </div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
              Captured Date
            </span>
            <span className="text-xs font-mono text-zinc-300">
              {log.createdAt && new Date(log.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Render extra dynamic key-values */}
          {Object.entries(extraData).map(([key, val]) => (
            <div
              key={key}
              className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl"
            >
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1 truncate">
                {key}
              </span>
              <span className="text-xs text-zinc-300 font-medium truncate block">
                {typeof val === "object" ? JSON.stringify(val) : String(val)}
              </span>
            </div>
          ))}
        </div>

        {/* Raw JSON Toggle Section */}
        <div className="pt-2">
          <button
            onClick={() => setShowJson(!showJson)}
            className="w-full py-2 px-3 text-xs font-medium text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-between"
          >
            <span>Raw JSON Data</span>
            <span>{showJson ? "▲ Hide" : "▼ Show"}</span>
          </button>

          {showJson && (
            <pre className="mt-2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[11px] font-mono text-zinc-400 overflow-x-auto max-h-48">
              {JSON.stringify(log, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 p-3 z-30">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleCopy}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
          >
            {copied ? "✓ Payload Copied!" : "Copy Log Payload"}
          </button>
        </div>
      </div>
    </div>
  );
}
