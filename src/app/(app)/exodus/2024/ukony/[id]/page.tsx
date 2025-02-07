import { DayFormatterMDX } from "@/components/days/day-formatter";
import { UkonyPagination } from "@/components/navigation/ukony-pagination";
import { promises as fs } from "fs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";

export const metadata: Metadata = {
  title: "Exodus90 - Text na den",
  description: "Best website ever",
};

export default async function RemoteMdxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  const files = await fs.readdir(path.join(process.cwd(), "src/app/(app)/data/ukony"), "utf-8");
  try {
    const filePath = path.join(process.cwd(), "src/app/(app)/data/ukony", `${params.id}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <UkonyPagination currentPage={params.id} lastPage={files.length} />
        <DayFormatterMDX source={dayTextMd} />
        <UkonyPagination currentPage={params.id} lastPage={files.length} />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
