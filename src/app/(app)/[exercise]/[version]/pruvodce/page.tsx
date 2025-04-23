import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import config from "@payload-config";
import Link from "next/link";

import { H2 } from "@/components/typography";
import { getPayload } from "payload";

type ArticleMetaData = {
  title: string;
  date: Date;
  published: boolean;
  slug: string;
  description: string;
  tags: ["modlitba" | "discipliny" | "navod"];
  id: string;
  link: string;
};

// export const dynamic = "force-static";

type GuideProps = {
  params: Promise<{
    version: string;
    exercise: string;
  }>;
};

export default async function GuidePage(props: GuideProps) {
  const params = await props.params;
  const payload = await getPayload({ config });

  const guideArticles = await payload.find({
    collection: "guide",
    where: {
      "version.slug": { equals: params.version },
      "version.exercise.slug": { equals: params.exercise },
    },
    select: {
      orderNumber: true,
      title: true,
      slug: true,
    },
    sort: "orderNumber",
  });

  if (guideArticles.docs.length === 0) {
    return (
      <div className="text-center">
        Zatím tady žádné články nejsou. Pokud si myslíš, že to je chyba, dej nám prosím vědět.
      </div>
    );
  }

  return (
    <div>
      <H2>Průvodce</H2>
      <div className="grid gap-4 pt-2 md:grid-cols-2">
        {guideArticles.docs.map((article, index) => {
          // const fileName = file.replace(".md", "");
          return (
            <Link href={`pruvodce/${article.slug}`} key={index} className="h-full">
              <Card className="hover:bg-background/90 h-full">
                <CardHeader className="pb-2">
                  <CardTitle>
                    <p className="text-2xl font-black">{article.title}</p>
                  </CardTitle>
                  <CardDescription className="flex gap-2 pt-2">
                    {/* {article.tags?.map((tag) => {
                      return (
                        <Badge
                          variant={"outline"}
                          key={badges[tag].text}
                          className={`${badges[tag].color} text-[14px] font-semibold`}
                        >
                          {badges[tag].text}
                        </Badge>
                      );
                    })} */}
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <p>{article.description}</p>
                </CardContent> */}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
