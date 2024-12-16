import { ArticleMDX } from "@/components/article-formatter";
import { notFound } from "next/navigation";
import path from "path";
import { getMarkdownData } from "../utils";
import { ArticlePagination } from "./article-pagination";

// export const dynamic = "force-static";

export default async function RemoteMdxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (params.id.length === 1) {
    params.id = "0" + params.id;
  }
  try {
    const filePath = path.join(process.cwd(), "src/app/data/articles", `${params.id}.md`);
    const { data, content } = await getMarkdownData(filePath);
    return (
      <>
        <ArticlePagination
          nextDay={data.nextPage && { slug: data.nextPage, title: data.nextPageText }}
          previousDay={data.previousPage && { slug: data.previousPage, title: data.previousPageText }}
        />
        <ArticleMDX source={content} />
        <ArticlePagination
          nextDay={data.nextPage && { slug: data.nextPage, title: data.nextPageText }}
          previousDay={data.previousPage && { slug: data.previousPage, title: data.previousPageText }}
        />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
