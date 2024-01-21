import { promises as fs } from "fs";

import { countDaysFromJan1PlusOne } from "@/app/utils/date";

import { DayPagination } from "@/app/components/day-pagination";
import Timer from "@/app/components/timer";
import { notFound } from "next/navigation";
import path from "path";
import { CustomMDX } from "../../components/md-formatter";

export default async function RemoteMdxPage() {
  const today = countDaysFromJan1PlusOne();
  const files = await fs.readdir(path.join(process.cwd(), "src/app/data/days"), "utf-8");
  try {
    const filePath = path.join(process.cwd(), "src/app/data/days", `${today}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <DayPagination currentPage={`${today}`} lastPage={files.length} />
        <CustomMDX source={dayTextMd} />
        <DayPagination currentPage={`${today}`} lastPage={files.length} />
        <Timer audioSrc="/sounds/gong.mp3" />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
