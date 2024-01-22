import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { H2 } from "../components/typography";

export default async function RemoteMdxPage() {
  // FOR NOW JUST HARDCODED
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
  };
  const articles = [
    {
      id: 1,
      title: "Jak se modlit svatou hodinu",
      description: "Jsi ztracen, jak se modlit svatou hodinu? Tady je jeden z možných cest jak na to.",
      link: "/jak-se-modlit-svatou-hodinu",
      badges: [badges.modlitba, badges.navod],
    },
    {
      id: 2,
      title: "Jak se modlit Examen",
      description: "Noční zkoumání dne je způsob, jak popsat naše jednání (jak si projít naše činy) za celý den.",
      link: "/nocni-examen",
      badges: [badges.modlitba, badges.navod],
    },
    {
      id: 3,
      title: "Týdenní setkání bratrsva",
      description: "Zkrácená verze jak vést týdenní setkání - jen s nejnutnějšími body.",
      link: "/tydenni-setkani-zkracena-verze",
      badges: [badges.navod],
    },
    {
      id: 4,
      title: "Disciplíny",
      description: "Disciplíný Exodus90, které je potřeba dodržovat. Denní, týdenní, měsíční.",
      link: "/discipliny",
      badges: [badges.discipliny],
    },
    {
      id: 5,
      title: "Exodus a Tvoje manželka",
      description: "Jak přežít a prožít Exodus90 s manželkou.",
      link: "/exodus-a-tvoje-manzelka",
      badges: [badges.navod],
    },
  ];

  return (
    <div>
      <H2>Články</H2>
      <div className="grid gap-4 pt-2 md:grid-cols-2">
        {articles.map((article, index) => {
          // const fileName = file.replace(".md", "");
          return (
            <Link href={"/articles/" + article.link} key={index}>
              <Card className="hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle>
                    <H2 className="text-2xl font-black">{article.title}</H2>
                  </CardTitle>
                  <CardDescription className="flex gap-2 pt-2">
                    {article.badges?.map((badge) => {
                      return (
                        <Badge
                          variant={"outline"}
                          key={badge.text}
                          className={`${badge.color} text-[14px] font-semibold`}
                        >
                          {badge.text}
                        </Badge>
                      );
                    })}
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
