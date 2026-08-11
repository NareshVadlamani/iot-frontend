import { HistoryLogMessage } from "@/src/app/actions/history";

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
          User Pic
        </th>
        <th
          style={{
            padding: "12px 16px",
            width: "100px",
            color: "#a1a1aa",
            fontWeight: "600",
          }}
        >
          Entry Date/Time
        </th>
        <th
          style={{
            padding: "12px 16px",
            color: "#a1a1aa",
            fontWeight: "600",
            width: "150px",
          }}
        >
          Reason
        </th>
        <th
          style={{
            padding: "12px 16px",
            width: "100px",
            color: "#a1a1aa",
            fontWeight: "600",
          }}
        >
          Event ID
        </th>
      </tr>
    </thead>
  );
};

export const HistoryTable = ({ logs }: { logs: HistoryLogMessage[] }) => {
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
      <div style={{ maxHeight: "700px", overflowY: "auto" }}>
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
                const { eventId, reason, imageUrl, createdAt } = log || {};

                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #18181b",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {/* Timestamp */}
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#71717a",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Event preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "6px",
                          objectFit: "cover",
                          border: "1px solid #3f3f46",
                          backgroundColor: "#18181b",
                          flexShrink: 0,
                        }}
                      />
                    </td>

                    {/* Level Badge */}
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      {createdAt && new Date(createdAt).toLocaleTimeString()}
                    </td>

                    {/* Message */}
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#f4f4f5",
                        fontWeight: "400",
                      }}
                    >
                      <div style={{ color: "#e4e4e7" }}>
                        <strong style={{ color: "#a1a1aa" }}>Reason:</strong>{" "}
                        {reason}
                      </div>
                    </td>

                    {/* Payload / Data Details */}
                    <td style={{ padding: "12px 16px" }}>
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
