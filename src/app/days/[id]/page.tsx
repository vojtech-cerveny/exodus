import { DayPagination } from "@/app/components/day-pagination";
import Timer from "@/app/components/timer";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import { CustomMDX } from "../../components/md-formatter";

export default async function RemoteMdxPage({ params }: { params: { id: string } }) {
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/days"), "utf-8");
  try {
    const filePath = path.join(process.cwd(), "src/app/data/days", `${params.id}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <DayPagination currentPage={params.id} lastPage={files.length} />
        <CustomMDX source={dayTextMd} />
        <DayPagination currentPage={params.id} lastPage={files.length} />
        <Timer audioSrc="/sounds/gong.mp3" />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
