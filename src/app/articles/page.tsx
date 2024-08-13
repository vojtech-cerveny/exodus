import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { promises as fs } from "fs";
import Link from "next/link";
import { H2 } from "../../components/typography";
import { getMarkdownData } from "./utils";

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

export default async function RemoteMdxPage() {
  async function getFilesInFolder() {
    const folderPath = process.cwd() + "/src/app/data/articles/";
    const files = await fs.readdir(folderPath);
    return files;
  }

  const fileNames = await getFilesInFolder();
  const articlesMetaData: ArticleMetaData[] = await Promise.all(
    fileNames.map(async (file, index) => {
      const { data } = await getMarkdownData(process.cwd() + "/src/app/data/articles/" + file);
      return { ...data, link: `/${file.replace(".md", "")}` };
    }) as any,
  );

  articlesMetaData.sort((a, b) => {
    return Number.parseInt(a.id) - Number.parseInt(b.id);
  });

  // FOR NOW JUST HARDCODED and not used - but will be used in the future 🤷‍♂️
  const badges = {
    modlitba: {
      text: "Modlitba",
      color:
        "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800 text-zinc-700 dark:text-zinc-400 hover:bg-green-200 dark:hover:bg-green-800",
    },
    discipliny: {
      text: "Disciplíny",
      color:
        "bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800 text-zinc-700 dark:text-zinc-400 hover:bg-blue-200 dark:hover:bg-blue-800",
    },
    navod: {
      text: "Návod",
      color:
        "bg-orange-100 dark:bg-orange-950 border-orange-300 dark:border-orange-800 text-zinc-800 dark:text-zinc-400 hover:bg-orange-200 dark:hover:bg-orange-800",
    },
    exodus90: {
      text: "Exodus90",
      color:
        "bg-gray-100 dark:bg-gray-950 border-gray-300 dark:border-gray-800 text-zinc-800 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-gray-800",
    },
  };

  return (
    <div>
      <H2>Průvodce</H2>
      <div className="grid gap-4 pt-2 md:grid-cols-2">
        {articlesMetaData.map((article, index) => {
          // const fileName = file.replace(".md", "");
          return (
            <Link href={"/articles" + article.link} key={index} className="h-full">
              <Card className="h-full hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
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
                <CardContent>
                  <p>{article.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
