"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface LogMessage {
  timestamp: string;
  level: "info" | "error" | "success";
  message: string;
  data?: any;
}

// Replace with your Render URL or local URL
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LiveLogs() {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to Socket.IO backend
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    // Listen for incoming live logs from Express backend
    socket.on("new_image", (log: LogMessage) => {
      setLogs((prevLogs) => [log, ...prevLogs]); // Prepend latest log
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>
        Live Backend Logs{" "}
        <span style={{ color: connected ? "green" : "red", fontSize: "14px" }}>
          ● {connected ? "Connected" : "Disconnected"}
        </span>
      </h2>

      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          borderRadius: "8px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {logs.length === 0 ? (
          <p style={{ color: "#888" }}>Waiting for logs...</p>
        ) : (
          logs.map((log, index) => {
            const color =
              log.level === "success"
                ? "#4CAF50"
                : log.level === "error"
                  ? "#F44336"
                  : "#2196F3";

            return (
              <div
                key={index}
                style={{ marginBottom: "8px", borderBottom: "1px solid #333" }}
              >
                <span style={{ color: "#aaa", marginRight: "8px" }}>
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <strong style={{ color, marginRight: "8px" }}>
                  [{log.level.toUpperCase()}]
                </strong>
                <span>{log.message}</span>
                {log.data && (
                  <pre
                    style={{
                      fontSize: "12px",
                      color: "#ccc",
                      margin: "4px 0 0 20px",
                    }}
                  >
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
