"use client";
import { DownloadTextFiles } from "@/components/download-text-files";
import { H1 } from "@/components/typography";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { unstable_noStore } from "next/cache";
import useLocalStorage from "../hooks/useLocalStorage";

export default function RemoteMdxPage() {
  unstable_noStore();
  const [version, setVersion] = useLocalStorage("exodus-version", "2025");

  const selectVersion = (version: string) => {
    console.log(version);
    setVersion(version);
  };

  return (
    <>
      <H1>Exodus90</H1>
      <p>
        Máme dvě verze Exodus90. Je na Tobě a na Tvém bratrstvu, jaké si vyberete. Exodus90 2024 verze je již přeložená,
        připravená pro tisk a pro čtečky. Verze 2025 se momentálně překládá (texty budeme uvolňovat postupně dle
        anglického originálu), ale je nejaktuálnější.
      </p>
      <div className="my-4 flex items-center justify-center space-x-4">
        <p> Vyber si svou verzi:</p>
        <Select onValueChange={selectVersion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={version} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Pokud cítíš, že bys potřeboval zapracovat nejen na svém byznysu a na zvýšení konta v bance, ale také na
        zvládnutí sebe sama, osvobodit se od svých malých závislostí, posílit svou identitu jako otce, manžela, nebo
        muže podle Boží Vůle a jsi ochoten prohloubit svůj duchovní život, pak jsi ve správný čas na správném místě.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Díky intenzivní modlitbě nad Písmem, cvičení askeze, podle osvědčené praxe církve a prožívání skutečného
        bratrství s druhými muži se můžeš i ty stát svobodným pro druhé a vyjít z otroctví podobně jako dávní izraelité
        z Egypta.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Cvičení Exodus90 je ovocem modlitby kněží a seminaristů v USA a od roku 2013 se ho účastnilo více než 40.000
        mužů, kteří nalezli cestu k vnitřní svobodě. Účastnit se ho mohou muži ze všech křesťanských církví.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Tato stránka má čistě informativní charakter a žádným způsobem nechce konkurovat či nahradit původní stránky
        cvičení Exodus90.com. Naopak. Klademe si za cíl informovat a pomoci prožít mužům v České Republice tuto úžasnou
        zkušenost a podpořit tvůrce tohoto programu.
      </p>
      <DownloadTextFiles />
    </>
  );
}
