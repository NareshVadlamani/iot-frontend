"use client";

import { HistoryLogMessage } from "@/src/app/actions/history";
import DesktopLogDetail from "./desktopLog";
import MobileLogDetail from "./mobileLog";
import { useRouter } from "next/navigation";

interface LogDetailViewProps {
  log: HistoryLogMessage;
}

export default function LogDetailView({ log }: LogDetailViewProps) {
  const router = useRouter();

  const handleOnBack = () => {
    router.back();
  };
  return (
    <>
      <div className="hidden md:block">
        <DesktopLogDetail log={log} onBack={handleOnBack} />
      </div>
      <div className="block md:hidden">
        <MobileLogDetail log={log} onBack={handleOnBack} />
      </div>
    </>
  );
}
