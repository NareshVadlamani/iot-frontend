"use client";

import { HistoryLogMessage } from "@/src/app/actions/history";
import { useRouter } from "next/navigation";

export const HistoryTable = ({ logs }: { logs: HistoryLogMessage[] }) => {
  const router = useRouter();

  const handleEntryClick = (eventId?: string) => {
    if (!eventId) return;
    router.push(`/entry/${eventId}`);
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
          const { eventId, reason, imageUrl, createdAt } = log || {};

          return (
            <div
              key={eventId || index}
              onClick={() => handleEntryClick(eventId)}
              className="p-3.5 flex gap-3.5 items-center active:bg-zinc-900/80 transition-colors cursor-pointer"
            >
              {/* User Pic / Preview */}
              <div className="flex-shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Event preview"
                    className="w-16 h-16 rounded-lg object-cover border border-zinc-700 bg-zinc-900"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[10px] text-zinc-600">
                    No Pic
                  </div>
                )}
              </div>

              {/* Log Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <code className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-[11px] font-mono border border-zinc-700/50">
                    {eventId || "N/A"}
                  </code>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {createdAt
                      ? new Date(createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>

                <div className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  <span className="text-zinc-500 font-medium">Reason: </span>
                  {reason || "N/A"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW: Table (≥ 768px) */}
      <div className="hidden md:block max-h-[700px] overflow-y-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead className="sticky top-0 bg-zinc-900 border-b border-zinc-800 z-10 text-zinc-400">
            <tr>
              <th className="py-3 px-4 w-32 font-semibold">User Pic</th>
              <th className="py-3 px-4 w-36 font-semibold">Entry Date/Time</th>
              <th className="py-3 px-4 font-semibold">Reason</th>
              <th className="py-3 px-4 w-36 font-semibold">Event ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {logs.map((log, index) => {
              const { eventId, reason, imageUrl, createdAt } = log || {};

              return (
                <tr
                  key={eventId || index}
                  onClick={() => handleEntryClick(eventId)}
                  className="hover:bg-zinc-900/60 transition-colors cursor-pointer"
                >
                  {/* User Pic */}
                  <td className="py-3 px-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Event preview"
                        className="w-20 h-20 rounded-md object-cover border border-zinc-700 bg-zinc-900"
                      />
                    ) : (
                      <span className="text-zinc-600 italic">No Preview</span>
                    )}
                  </td>

                  {/* Time */}
                  <td className="py-3 px-4 text-zinc-200 whitespace-nowrap">
                    {createdAt ? new Date(createdAt).toLocaleTimeString() : "—"}
                  </td>

                  {/* Reason */}
                  <td className="py-3 px-4 text-zinc-200">
                    <div className="text-zinc-300 font-sans">
                      <strong className="text-zinc-400">Reason: </strong>
                      {reason}
                    </div>
                  </td>

                  {/* Event ID */}
                  <td className="py-3 px-4">
                    <code className="bg-zinc-800 text-zinc-200 px-2 py-1 rounded text-xs border border-zinc-700/50">
                      {eventId}
                    </code>
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
