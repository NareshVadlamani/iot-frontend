"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { LogMessage, LogTable } from "./Table/logTable";
import { LiveLogHeader } from "./Header/liveLogHeader";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LiveLogs() {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ["polling", "websocket"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      withCredentials: true,
    });

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("entry_log", (log: LogMessage) => {
      setLogs((prev) => [log, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#e2e8f0",
      }}
    >
      {/* Header Bar */}

      <LiveLogHeader connected={connected} />
      <LogTable logs={logs} />
    </div>
  );
}
