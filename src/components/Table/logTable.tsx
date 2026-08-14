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

const TableHead = () => {
  return (
    <thead
      style={{
        position: "sticky",
        top: 0,
        background: "#18181b",
        borderBottom: "1px solid #27272a",
        zIndex: 1,
      }}
    >
      <tr>
        <th
          style={{
            padding: "12px 16px",
            width: "110px",
            color: "#a1a1aa",
            fontWeight: "600",
          }}
        >
          Time
        </th>
        <th
          style={{
            padding: "12px 16px",
            width: "100px",
            color: "#a1a1aa",
            fontWeight: "600",
          }}
        >
          Level
        </th>
        <th
          style={{
            padding: "12px 16px",
            color: "#a1a1aa",
            fontWeight: "600",
          }}
        >
          Message
        </th>
        <th
          style={{
            padding: "12px 16px",
            width: "320px",
            color: "#a1a1aa",
            fontWeight: "600",
          }}
        >
          Payload / Details
        </th>
      </tr>
    </thead>
  );
};

export const LogTable = ({ logs }: { logs: LogMessage[] }) => {
  const router = useRouter();
  const handleEntryClick = (eventId?: string) => {
    if (!eventId) return;
    router.push(`/entry/${eventId}`);
  };

  const getLevelBadge = (level: LogMessage["level"]) => {
    const config = {
      success: {
        bg: "rgba(34, 197, 94, 0.15)",
        color: "#4ade80",
        border: "rgba(34, 197, 94, 0.3)",
      },
      error: {
        bg: "rgba(239, 68, 68, 0.15)",
        color: "#f87171",
        border: "rgba(239, 68, 68, 0.3)",
      },
      info: {
        bg: "rgba(59, 130, 246, 0.15)",
        color: "#60a5fa",
        border: "rgba(59, 130, 246, 0.3)",
      },
    }[level] || {
      bg: "rgba(156, 163, 175, 0.15)",
      color: "#9ca3af",
      border: "rgba(156, 163, 175, 0.3)",
    };

    return (
      <span
        style={{
          backgroundColor: config.bg,
          color: config.color,
          border: `1px solid ${config.border}`,
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {level}
      </span>
    );
  };

  return (
    <div
      style={{
        background: "#09090b",
        border: "1px solid #27272a",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "13px",
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        >
          <TableHead />
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "48px",
                    textAlign: "center",
                    color: "#71717a",
                    fontSize: "14px",
                  }}
                >
                  Waiting for incoming logs...
                </td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const { eventId, reason, imageUrl } = log.data || {};

                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #18181b",
                      transition: "background 0.15s ease",
                    }}
                    onClick={() => handleEntryClick(eventId)}
                  >
                    {/* Timestamp */}
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#71717a",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>

                    {/* Level Badge */}
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      {getLevelBadge(log.level)}
                    </td>

                    {/* Message */}
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#f4f4f5",
                        fontWeight: "400",
                      }}
                    >
                      {log.message}
                    </td>

                    {/* Payload / Data Details */}
                    <td style={{ padding: "12px 16px" }}>
                      {log.data ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div style={{ fontSize: "12px", lineHeight: "1.4" }}>
                            {reason && (
                              <div style={{ color: "#e4e4e7" }}>
                                <strong style={{ color: "#a1a1aa" }}>
                                  Reason:
                                </strong>{" "}
                                {reason}
                              </div>
                            )}
                            {eventId && (
                              <div>
                                <span style={{ color: "#a1a1aa" }}>
                                  Event ID:{" "}
                                </span>
                                <code
                                  style={{
                                    background: "#27272a",
                                    padding: "1px 5px",
                                    borderRadius: "4px",
                                    color: "#f4f4f5",
                                    fontSize: "11px",
                                  }}
                                >
                                  {eventId}
                                </code>
                              </div>
                            )}
                          </div>
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt="Event preview"
                              style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "6px",
                                objectFit: "cover",
                                border: "1px solid #3f3f46",
                                backgroundColor: "#18181b",
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <span style={{ color: "#52525b" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
