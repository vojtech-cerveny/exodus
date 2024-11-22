import ProgressUpdateCard from "@/components/brotherhood/progress-update-card";
import { DayFormatterMDX } from "@/components/days/day-formatter";
import { DayPagination } from "@/components/days/day-pagination";
import Timer from "@/components/days/timer";
import { promises as fs } from "fs";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { notFound } from "next/navigation";
import path from "path";
import { auth } from "../../../../../../auth";

export const metadata: Metadata = {
  title: "👑 Královské léto - Text na den",
  description: "",
};

export default async function RemoteMdxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/kralovske-leto/days"), "utf-8");
  try {
    const filePath = path.join(process.cwd(), "src/app/data/kralovske-leto/days", `${params.id}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <DayPagination currentPage={params.id} lastPage={files.length} runType="kralovske-leto" />
        <SessionProvider basePath={"/api/auth"} session={session}>
          <DayFormatterMDX source={dayTextMd} />
        </SessionProvider>
        <DayPagination currentPage={params.id} lastPage={files.length} runType="kralovske-leto" />
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
