import { ArticleMDX } from "@/components/article-formatter";
import { notFound } from "next/navigation";
import path from "path";
import { getMarkdownData } from "../utils";

export const dynamic = "force-static";

export default async function RemoteMdxPage({ params }: { params: { id: string } }) {
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  try {
    const filePath = path.join(process.cwd(), "src/app/data/articles", `${params.id}.md`);
    const { content } = await getMarkdownData(filePath);
    return (
      <>
        <ArticleMDX source={content} />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
