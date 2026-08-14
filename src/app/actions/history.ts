export interface HistoryLogMessage {
  eventId?: string;
  reason?: string;
  imageUrl?: string;
  createdAt?: string;
}

interface PaginatedLogsResponse {
  data: HistoryLogMessage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const fetchHistoryLogs = async (
  page: number,
  limit: number,
): Promise<PaginatedLogsResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/usersEntry/getAll?page=${page}&limit=${limit}`,
      {
        cache: "no-store", // Or next: { revalidate: 10 } depending on your caching strategy
      },
    );

    if (!res.ok) throw new Error("Failed to fetch logs");
    return res.json();
  } catch (error) {
    console.error("Failed to connect to backend:", error);
    // Return empty fallback structure instead of crashing with 500
    return {
      data: [],
      pagination: { totalPages: 1, total: 0, limit: 0, page: 0 },
    };
  }
};

export const fetchEventById = async (
  eventId: string,
): Promise<{ data?: HistoryLogMessage }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/usersEntry/get?eventId=${eventId}`,
      {
        cache: "no-store", // Or next: { revalidate: 10 } depending on your caching strategy
      },
    );

    if (!res.ok) throw new Error("Failed to fetch logs");
    console.log("res", { res, eventId });
    return res.json();
  } catch (error) {
    console.error("Failed to connect to backend:", error);
    // Return empty fallback structure instead of crashing with 500
    return {
      data: undefined,
    };
  }
};
