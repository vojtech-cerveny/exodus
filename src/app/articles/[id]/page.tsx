import { promises as fs } from "fs";
import { CustomMDX } from "../../components/md-formatter";
import { notFound } from "next/navigation";
import path from "path";
import Timer from "@/app/components/timer";


export default async function RemoteMdxPage({ params }: { params: { id: string } }) {
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  try {
    const filePath = path.join(process.cwd(), "src/app/data/articles", `${params.id}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <CustomMDX source={dayTextMd} />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
