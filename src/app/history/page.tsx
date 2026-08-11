import { useEffect } from "react";

import Link from "next/link";
import { fetchHistoryLogs } from "../actions/history";
import { LogTable } from "@/src/components/Table/logTable";
import { HistoryTable } from "@/src/components/Table/HistoryTable";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        background: "#18181b",
        borderTop: "1px solid #27272a",
        fontSize: "13px",
      }}
    >
      <span style={{ color: "#a1a1aa" }}>
        Page <strong>{page}</strong> of <strong>{totalPages || 1}</strong>
      </span>

      <div style={{ display: "flex", gap: "8px" }}>
        {/* Previous Page Link */}
        {page > 1 ? (
          <Link
            href={`?page=${page - 1}`}
            style={{
              padding: "6px 12px",
              background: "#27272a",
              color: "#f4f4f5",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Previous
          </Link>
        ) : (
          <span
            style={{
              padding: "6px 12px",
              background: "#18181b",
              color: "#52525b",
              borderRadius: "6px",
            }}
          >
            Previous
          </span>
        )}

        {/* Next Page Link */}
        {page < totalPages ? (
          <Link
            href={`?page=${page + 1}`}
            style={{
              padding: "6px 12px",
              background: "#27272a",
              color: "#f4f4f5",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Next
          </Link>
        ) : (
          <span
            style={{
              padding: "6px 12px",
              background: "#18181b",
              color: "#52525b",
              borderRadius: "6px",
            }}
          >
            Next
          </span>
        )}
      </div>
    </div>
  );
};

export default async function History({ searchParams }: PageProps) {
  // 1. Extract and parse current page and limit from URL query params
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 100;

  // 2. Fetch paginated data
  const { data, pagination } = await fetchHistoryLogs(page, limit);

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
            Log History
          </h2>
        </div>
      </div>

      {/* Table Container */}
      <HistoryTable logs={data} />
      <Pagination page={pagination.page} totalPages={pagination.totalPages} />
    </div>
  );
}
