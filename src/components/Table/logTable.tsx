"use client";

import { useRouter } from "next/navigation";

export interface LogMessage {
  timestamp: string;
  level: "info" | "error" | "success";
  message: string;
  data?: {
    eventId?: string;
    reason?: string;
    imageUrl?: string;
    [key: string]: any;
  };
}

export const LogTable = ({ logs }: { logs: LogMessage[] }) => {
  const router = useRouter();

  const handleEntryClick = (eventId?: string) => {
    if (!eventId) return;
    router.push(`/entry/${eventId}`);
  };

  const getLevelBadge = (level: LogMessage["level"]) => {
    const styles =
      {
        success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        error: "bg-red-500/15 text-red-400 border-red-500/30",
        info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      }[level] || "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";

    return (
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${styles}`}
      >
        {level}
      </span>
    );
  };

  if (!logs || logs.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center text-zinc-500 text-sm shadow-xl">
        Waiting for incoming logs...
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* MOBILE VIEW: List Cards (< 768px) */}
      <div className="block md:hidden divide-y divide-zinc-900">
        {logs.map((log, index) => {
          const { eventId, reason, imageUrl } = log.data || {};

          return (
            <div
              key={eventId || index}
              onClick={() => handleEntryClick(eventId)}
              className="p-4 flex flex-col gap-2.5 active:bg-zinc-900/80 transition-colors cursor-pointer"
            >
              {/* Top Row: Level & Timestamp */}
              <div className="flex items-center justify-between">
                {getLevelBadge(log.level)}
                <span className="text-xs text-zinc-500 font-mono">
                  {log.timestamp
                    ? new Date(log.timestamp).toLocaleTimeString()
                    : ""}
                </span>
              </div>

              {/* Message */}
              <p className="text-sm font-medium text-zinc-100 leading-snug">
                {log.message}
              </p>

              {/* Payload Box (if present) */}
              {log.data && (
                <div className="flex items-center justify-between gap-3 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60 mt-1">
                  <div className="text-xs space-y-1 overflow-hidden min-w-0 flex-1">
                    {reason && (
                      <p className="text-zinc-300 font-sans truncate">
                        <span className="text-zinc-500 font-medium">
                          Reason:{" "}
                        </span>
                        {reason}
                      </p>
                    )}
                    {eventId && (
                      <p className="text-zinc-400 font-mono text-[11px]">
                        <span className="text-zinc-500">Event ID: </span>
                        <code className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded border border-zinc-700/50">
                          {eventId}
                        </code>
                      </p>
                    )}
                  </div>

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Event preview"
                      className="w-14 h-14 rounded-md object-cover border border-zinc-700 bg-zinc-900 flex-shrink-0"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW: Table (≥ 768px) */}
      <div className="hidden md:block max-h-[500px] overflow-y-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead className="sticky top-0 bg-zinc-900 border-b border-zinc-800 z-10 text-zinc-400">
            <tr>
              <th className="py-3 px-4 w-28 font-semibold">Time</th>
              <th className="py-3 px-4 w-28 font-semibold">Level</th>
              <th className="py-3 px-4 font-semibold">Message</th>
              <th className="py-3 px-4 w-80 font-semibold">
                Payload / Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {logs.map((log, index) => {
              const { eventId, reason, imageUrl } = log.data || {};

              return (
                <tr
                  key={eventId || index}
                  onClick={() => handleEntryClick(eventId)}
                  className="hover:bg-zinc-900/60 transition-colors cursor-pointer"
                >
                  {/* Timestamp */}
                  <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleTimeString()
                      : "—"}
                  </td>

                  {/* Level Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getLevelBadge(log.level)}
                  </td>

                  {/* Message */}
                  <td className="py-3 px-4 text-zinc-200 font-sans font-normal">
                    {log.message}
                  </td>

                  {/* Payload / Details */}
                  <td className="py-3 px-4">
                    {log.data ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs leading-relaxed font-sans">
                          {reason && (
                            <div className="text-zinc-300">
                              <strong className="text-zinc-500 font-semibold">
                                Reason:{" "}
                              </strong>
                              {reason}
                            </div>
                          )}
                          {eventId && (
                            <div className="text-zinc-500 font-mono text-[11px] mt-0.5">
                              <span>Event ID: </span>
                              <code className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded border border-zinc-700/50">
                                {eventId}
                              </code>
                            </div>
                          )}
                        </div>

                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Event preview"
                            className="w-16 h-16 rounded-md object-cover border border-zinc-700 bg-zinc-900 flex-shrink-0"
                          />
                        )}
                      </div>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
