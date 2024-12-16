import { promises as fs } from "fs";

import ProgressUpdateCard from "@/components/brotherhood/progress-update-card";
import { DayPagination } from "@/components/days/day-pagination";

import { DayFormatterMDX } from "@/components/days/day-formatter";
import ExodusIsOver from "@/components/days/exodus-is-over";
import Timer from "@/components/days/timer";
import { auth } from "@auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";
import path from "path";
import { getEventStatus } from "../../utils/date";

export const metadata: Metadata = {
  title: "👑 Královské léto - Text na den",
  description: "",
};

export default async function RemoteMdxPage() {
  unstable_noStore();
  const session = await auth();
  const krLeto = getEventStatus("KRALOVSKE_LETO");
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/kralovske-leto/days"), "utf-8");
  const formattedToday = krLeto.currentDays < 10 ? `0${krLeto.currentDays}` : `${krLeto.currentDays}`;
  if (!krLeto.isRunning) {
    return <ExodusIsOver />;
  }
  try {
    const filePath = path.join(process.cwd(), "src/app/data/kralovske-leto/days", `${formattedToday}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <SessionProvider basePath={"/api/auth"} session={session}>
          <DayPagination currentPage={formattedToday} lastPage={files.length} runType="kralovske-leto" />
          <DayFormatterMDX source={dayTextMd} />
          <DayPagination currentPage={formattedToday} lastPage={files.length} runType="kralovske-leto" />
          <Timer audioSrc="/sounds/gong.mp3" />
          {session && (
            <div className="mb-4 flex items-center justify-center">
              <ProgressUpdateCard />
            </div>
          )}
        </SessionProvider>
      </>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
