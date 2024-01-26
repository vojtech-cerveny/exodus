import { ArticleMDX } from "@/components/article-formatter";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";

export default async function RemoteMdxPage({ params }: { params: { id: string } }) {
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  try {
    const filePath = path.join(process.cwd(), "src/app/data/articles", `${params.id}.md`);
    const dayTextMd = await fs.readFile(filePath, "utf-8");
    return (
      <>
        <ArticleMDX source={dayTextMd} />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
