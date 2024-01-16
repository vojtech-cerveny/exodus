import { promises as fs } from "fs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { H2 } from "../components/typography";

export default async function RemoteMdxPage() {
  async function getFilesInFolder() {
    const folderPath = process.cwd() + "/src/app/data/articles/";
    const files = await fs.readdir(folderPath);
    return files;
  }

  // FOR NOW JUST HARDCODED
  const articles = [
    {
      id: 1,
      title: "Jak se modlit svatou hodinu",
      description: "Jsi ztracen, jak se modlit svatou hodinu? Tady je jeden z možných cest jak na to.",
      link: "/jak-se-modlit-svatou-hodinu",
    },
  ];

  return (
    <div>
      <H2>Articles</H2>
      <div className="pt-2 grid grid-cols-2">
        {articles.map((article, index) => {
          // const fileName = file.replace(".md", "");
          return (
            <Link href={"/articles/" + article.link} key={index}>
              <Card>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
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
