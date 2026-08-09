import Image from "next/image";
import LiveLogs from "../components/liveLogs";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center  font-sans dark:bg-black bg-white">
      <main className=" w-full max-w-3xl dark:bg-black h-100vh bg-gray-300 h-screen">
        <Header />
        <LiveLogs />
      </main>
    </div>
  );
}
