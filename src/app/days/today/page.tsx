import { promises as fs } from "fs";

import { countDaysFromJan1PlusOne } from "@/app/utils/date";

import ProgressUpdateCard from "@/components/brotherhood/progress-update-card";
import { DayPagination } from "@/components/days/day-pagination";

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
  const today = countDaysFromJan1PlusOne();
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/days"), "utf-8");
  if (today > 91) {
    return <ExodusIsOver />;
  }
  try {
    const filePath = path.join(process.cwd(), "src/app/data/days", `${today}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <SessionProvider basePath={"/api/auth"} session={session}>
          <DayPagination currentPage={`${today}`} lastPage={files.length} />
          <DayFormatterMDX source={dayTextMd} />
          <DayPagination currentPage={`${today}`} lastPage={files.length} />
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
    return notFound();
  }
}
