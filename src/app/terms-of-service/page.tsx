import { ArticleMDX } from "@/components/article-formatter";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";

export default async function PrivacyPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const filePath = path.join(process.cwd(), `src/app/data/terms-of-service-${searchParams.lang}.md`);
    console.log(filePath);
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
