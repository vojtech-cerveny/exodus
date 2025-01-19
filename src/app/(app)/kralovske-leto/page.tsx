import { promises as fs } from 'fs';

import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';
import { H1, H2, H3 } from '../../../components/typography';

export const metadata: Metadata = {
  title: 'Královské léto',
  description: 'Best website ever',
};

export default async function RemoteMdxPage() {
  unstable_noStore();

  async function getFilesInFolder() {
    const folderPath = process.cwd() + '/src/app/data/kralovske-leto/days/';
    const files = await fs.readdir(folderPath);
    return files;
  }

  return (
    <>
      <H1>Královské léto</H1>
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Počet dní: 79</p>
      <p>
        V duchovním životě je snadné polevit a zpohodlnět - zejména v letních měsících. Při našem putování s králem
        Davidem v Druhé Samuelově knize uvidíme, jak si David dovolí spokojeně složit ruce do klína, čímž se dostane do
        duchovní stagnace. Budeme sledovat jeho kralování, vítězství v bitvách i pády do hříchu. Jeho reakce spočívající
        v pokání a obrácení jsou vzorem pro náš vlastní neustálý vnitřní boj. Jsme povoláni být kněžími, proroky a
        králi. Toto duchovní cvičení nám ukáže, jak se stát duchovními vůdci. Když ztrácíme bdělost a vnímavost ve
        vztahu k Bohu, trpí tím i naši blízcí. Budeme se učit z Davidových silných i slabých stránek a naučíme se, jak
        být dobrými křesťanskými muži a duchovními vůdci.
      </p>
      <H2>Disciplíny</H2>
      <H3>DENNĚ </H3>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          Letní a reflexe (zamyšlení) Přečtěte si denní zamyšlení pro letní období. Čtení jsou vaším průvodcem na této
          duchovní cestě. Udělejte si čas a nechte k sobě promlouvat Boží slovo prostřednictvím těchto denních čtení.
        </li>
        <li>20 minut tiché modlitby Vyhraďte si minimálně 20 minut na tichou osobní modlitbu před Pánem.</li>
        <li>
          Prozkoumejte svůj den (Examen) Na konci dne v modlitbě prozkoumejte své činy (a nečinnost) během dne. Kde jste
          viděli, že Bůh ve vašem životě působí? Uvědomte si, kde jste reagovali na Boží milost a kde jste se rozhodli
          jednat jinak.
        </li>
      </ul>
      <H3>TÝDNĚ</H3>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          Týdenní setkání bratrstva - Jednou týdně by se měli všichni členové vašeho bratrstva sejít, aby zkontrolovali
          svou věrnost plánu života a společně se pomodlili. Zůstaňte věrní tomuto závazku, který jste dali svým
          bratřím. Udělejte něco pro to, aby vaše bratrstvo bylo oddanou skupinou bratří.
        </li>
        <li>
          Pátky se studenou sprchou V pátek nabídněte studenou sprchu. Příjemná teplá sprcha je sama o sobě dobrá věc.
          Když však pohodlí horké sprchy trvale stavíme na místo obětavé, nepohodlné studené sprchy, rozhodujeme se
          trvale vyměnit příležitost k oběti za pomíjivé osobní pohodlí.
        </li>
        <li>
          Pátky bez masa V pátek nekonzumujte maso na počest Kristovy smrti na kříži na Velký pátek. Poohlédněte se po
          jiných zdrojích bílkovin, jako jsou fazole, arašídové máslo apod.
        </li>
        <li>
          Každý týden jednu svatou hodinu Alespoň jednou týdně si vyhraďte hodinu pro tichou osobní modlitbu před naším
          Pánem. Naplánujte si vybraný den tak, aby se vám to do něj vešlo.
        </li>
        <li>
          Oslavte den Páně Každá neděle je malou velikonoční nedělí a měla by být slavena s radostnou oslavou a
          odpočinkem. Kolik z nás nevědomky nesnáší Den Páně, protože podléhá &quot;nedělnímu blues&quot;? Vyhraďte si
          tento den pro modlitbu, rodinu a přátele.
        </li>
      </ul>
    </>
  );
}
