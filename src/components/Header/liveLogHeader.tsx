export const LiveLogHeader = ({ connected }: { connected: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: "600",
          color: "#0f172a",
        }}
      >
        Live Backend Logs
      </h2>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#18181b",
          padding: "6px 12px",
          borderRadius: "20px",
          border: "1px solid #27272a",
          fontSize: "13px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: connected ? "#22c55e" : "#ef4444",
            boxShadow: connected ? "0 0 8px #22c55e" : "none",
          }}
        />
        <span
          style={{
            color: connected ? "#22c55e" : "#ef4444",
            fontWeight: 500,
          }}
        >
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>
    </div>
  );
};
