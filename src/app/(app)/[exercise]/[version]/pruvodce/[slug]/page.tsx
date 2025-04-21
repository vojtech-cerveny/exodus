import { notFound } from "next/navigation";

import config from "@payload-config";
import { getPayload } from "payload";
import { DayContentParser } from "../../components/DayContentParser";
import { ArticlePagination } from "./article-pagination";
// export const dynamic = "force-static";

type PageProps = {
  params: Promise<{
    slug: string;
    version: string;
    exercise: string;
  }>;
};

export default async function RemoteMdxPage(props: PageProps) {
  const params = await props.params;

  try {
    const payload = await getPayload({ config });
    const guideArticle = await payload.find({
      collection: "guide",
      where: {
        slug: { equals: params.slug },
        "version.slug": { equals: params.version },
        "version.exercise.slug": { equals: params.exercise },
      },
    });

    if (guideArticle.docs.length === 0) {
      return notFound();
    }

    const nextAndPrevious = await payload.find({
      collection: "guide",
      where: {
        "version.slug": { equals: params.version },
        "version.exercise.slug": { equals: params.exercise },
      },
      sort: "orderNumber",
    });

    const currentIndex = nextAndPrevious.docs.findIndex((doc) => doc.slug === params.slug);

    const nextPage = nextAndPrevious.docs[currentIndex + 1];
    const previousPage = nextAndPrevious.docs[currentIndex - 1];

    const isFirstGuide = currentIndex === 0;
    const isLastGuide = currentIndex === nextAndPrevious.docs.length - 1;

    return (
      <>
        <ArticlePagination
          nextDay={isLastGuide ? undefined : { slug: nextPage.slug, title: nextPage.title! }}
          previousDay={isFirstGuide ? undefined : { slug: previousPage.slug, title: previousPage.title! }}
        />
        <DayContentParser data={guideArticle.docs[0].content!} />
        <ArticlePagination
          nextDay={isLastGuide ? undefined : { slug: nextPage.slug, title: nextPage.title! }}
          previousDay={isFirstGuide ? undefined : { slug: previousPage.slug, title: previousPage.title! }}
        />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
