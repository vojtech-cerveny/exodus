import ProgressUpdateCard from "@/components/brotherhood/progress-update-card";
import { DayPagination } from "@/components/days/day-pagination";
import Timer from "@/components/days/timer";
import { promises as fs } from "fs";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { notFound } from "next/navigation";
import path from "path";
import { auth } from "../../../../../auth";
import { DayFormatterMDX } from "../../../../components/days/day-formatter";

export const metadata: Metadata = {
  title: "Exodus90 - Text na den",
  description: "Best website ever",
};

export default async function RemoteMdxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/days"), "utf-8");
  try {
    const filePath = path.join(process.cwd(), "src/app/data/days", `${params.id}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <DayPagination currentPage={params.id} lastPage={files.length} runType="exodus90" />
        <SessionProvider basePath={"/api/auth"} session={session}>
          <DayFormatterMDX source={dayTextMd} />
        </SessionProvider>
        <DayPagination currentPage={params.id} lastPage={files.length} runType="exodus90" />
        <Timer audioSrc="/sounds/gong.mp3" />
        {session && (
          <div className="mb-4 flex items-center justify-center">
            <ProgressUpdateCard />
          </div>
        )}
      </>
    );
  } catch (error) {
    return notFound();
  }
}
