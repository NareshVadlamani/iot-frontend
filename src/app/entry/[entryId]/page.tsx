import LogDetailView from "@/src/components/LogView";
import { fetchEventById } from "../../actions/history";

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EventPage({ params }: PageProps) {
  const resolveParams = await params;
  const eventId = String(resolveParams.entryId);
  const eventData = await fetchEventById(eventId);

  console.log("---------", { eventData });
  if (!eventData.data) {
    return <div>no data</div>;
  }

  return <LogDetailView log={eventData.data} />;
}
