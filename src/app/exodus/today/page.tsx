import { promises as fs } from "fs";

import { getEventStatus } from "@/app/utils/date";

import ProgressUpdateCard from "@/components/brotherhood/progress-update-card";
import { DayPagination } from "@/components/days/day-pagination";

import { AppError, handleError } from "@/app/utils/handle-errors";
import ExodusIsOver from "@/components/days/exodus-is-over";
import Timer from "@/components/days/timer";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";
import path from "path";
import { auth } from "../../../../auth";
import { DayFormatterMDX } from "../../../components/days/day-formatter";

export const metadata: Metadata = {
  title: "Exodus90 - Text na dnešek",
  description: "Best website ever",
};

export default async function RemoteMdxPage() {
  unstable_noStore();
  const session = await auth();
  const exodus = getEventStatus("EXODUS");
  const formattedCurrentDays = exodus.currentDays < 10 ? `0${exodus.currentDays}` : `${exodus.currentDays}`;
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/days"), "utf-8");
  if (!exodus.isRunning) {
    return <ExodusIsOver />;
  }
  let dayTextMd;
  try {
    const filePath = path.join(process.cwd(), "src/app/data/days", `${formattedCurrentDays}.md`);
    try {
      dayTextMd = await fs.readFile(filePath, "utf-8");
    } catch (error) {
      throw new AppError("FILE_NOT_FOUND", "Soubor s textem dneška nebyl nalezen");
    }
    return (
      <>
        <SessionProvider basePath={"/api/auth"} session={session}>
          <DayPagination currentPage={formattedCurrentDays} lastPage={files.length} runType="exodus90" />
          <DayFormatterMDX source={dayTextMd} />
          <DayPagination currentPage={formattedCurrentDays} lastPage={files.length} runType="exodus90" />
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
    await handleError(error);
    return notFound();
  }
}
