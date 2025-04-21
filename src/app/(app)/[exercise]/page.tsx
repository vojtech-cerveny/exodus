import { H1, H2 } from "@/components/typography";

import config from "@payload-config";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { DayContentParser } from "./[version]/components/DayContentParser";

type PageProps = {
  params: Promise<{
    exercise: string;
  }>;
};

export default async function RemoteMdxPage({ params }: PageProps) {
  unstable_noStore();
  const payload = await getPayload({ config });
  const aParams = await params;

  const exerciseResponse = await payload.find({
    collection: "exercises",
    where: { slug: { equals: aParams.exercise } },
  });

  const versionsResponse = await payload.find({
    collection: "versions",
    where: { "exercise.slug": { equals: aParams.exercise } },
  });

  if (exerciseResponse.docs.length === 0) {
    notFound();
  }

  const exercise = exerciseResponse.docs[0];

  return (
    <>
      <H1>{exercise.name}</H1>
      {exercise.description && <DayContentParser data={exercise.description} />}

      <H2>Verze</H2>
      <p>Máme k dispozici následující verze:</p>
      {versionsResponse.docs.map((version) => {
        return (
          <div key={version.id}>
            <Link href={`/${aParams.exercise}/${version.slug}`}>{version.name}</Link>
          </div>
        );
      })}
      {/* <p className="leading-7 not-first:mt-6">
        Pokud cítíš, že bys potřeboval zapracovat nejen na svém byznysu a na zvýšení konta v bance, ale také na
        zvládnutí sebe sama, osvobodit se od svých malých závislostí, posílit svou identitu jako otce, manžela, nebo
        muže podle Boží Vůle a jsi ochoten prohloubit svůj duchovní život, pak jsi ve správný čas na správném místě.
      </p>
      <p className="leading-7 not-first:mt-6">
        Díky intenzivní modlitbě nad Písmem, cvičení askeze, podle osvědčené praxe církve a prožívání skutečného
        bratrství s druhými muži se můžeš i ty stát svobodným pro druhé a vyjít z otroctví podobně jako dávní izraelité
        z Egypta.
      </p>
      <p className="leading-7 not-first:mt-6">
        Cvičení Exodus90 je ovocem modlitby kněží a seminaristů v USA a od roku 2013 se ho účastnilo více než 40.000
        mužů, kteří nalezli cestu k vnitřní svobodě. Účastnit se ho mohou muži ze všech křesťanských církví.
      </p>
      <p className="leading-7 not-first:mt-6">
        Tato stránka má čistě informativní charakter a žádným způsobem nechce konkurovat či nahradit původní stránky
        cvičení Exodus90.com. Naopak. Klademe si za cíl informovat a pomoci prožít mužům v České Republice tuto úžasnou
        zkušenost a podpořit tvůrce tohoto programu.
      </p>
      <DownloadTextFiles /> */}
    </>
  );
}
