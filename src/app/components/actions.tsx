"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MDXRemote } from "next-mdx-remote/rsc";

const action = [
  [
    {
      title: "**Vzdejte se kontroly.**",
      text: `Disciplíny Exodus 90 vám poskytují příležitost vzdát se kontroly nad svým životem a předat ji Bohu.
   Učte se nově svěřovat kontrolu do Božích rukou. Jako by rytíř položil svůj meč na oltář a na oplátku by obdržel Boží moc, musíte udělat totéž.`,
    },
    {
      title: "**Zavázat se k vašemu bratrstvu.**",
      text: `Tahle cesta je těžká. Budete vyzkoušeni a testováni. Budete potřebovat své bratry a oni budou potřebovat vás. Týdenní setkání jsou nutností.
   Modlete se jako Izraelité, kteří byli zachráněni jako kmen (a ne jednotlivě), aby Bůh vysvobodil vaše společenství a také všechny lidi, kteří čekají na vysvobození ze závislosti, sobectví, apatie a ovládání.`,
    },
    {
      title: "**Najít si čas pro každodenní modlitbu.**",
      text: `Strávit hodinu času v modlitbě každý den. Pokud je to nemožné, trávit co nejvíce času, jak je to možné, s minimálně dvaceti minutami tiché modlitby denně. Je dobré si naplánovat konkrétní čas během dne, nebo toho pravděpodobně zanecháte.`,
    },
    {
      title: "**Buďte radostní.**",
      text: `Přijali jste Kristův plán svobody. Ano, bude to těžké, ale to by vás nemělo zarmoutit. Spíše se těšte z naděje na svobodu, která vás čeká. Boží pozvání do tohoto duchovního cvičení by vám mělo přinést bohatou radost.`,
    },
    {
      title: "**Každou noc zkoumejte svůj den.**",
      text: `Exodus 90 obsahuje mnoho disciplín, na které můžete každým dnem odpovídat „ano“. Na konci každého dne před usnutím si nalezněte čas na to, abyste si prošli a zkoumali svůj den. To vám pomůže nejen úspěšně přistupovat na jednotlivé disciplíny, ale také vám pomůže vidět váš pokrok, který jste udělali na cestě ke svobodě. (Jak na to se dozvíte v příručce Exodu v sekci „Jak se modlit noční examen“).`,
    },
  ],
];

export function WeeklyActions(week: number) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {action[week - 1].map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.text}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}


