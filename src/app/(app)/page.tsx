import InstallPWAButton from "@/components/install-pwa-button";
import { unstable_noStore } from "next/cache";

import { getEventStatus } from "./utils/date";

import { H2 } from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookCopy, BookPlus } from "lucide-react";

export default function Home() {
  unstable_noStore();
  const exodus = getEventStatus("EXODUS");
  const krLeto = getEventStatus("KRALOVSKE_LETO");

  return (
    <>
      <main className="flex-1">
        <div className="flex h-full w-full max-w-2xl flex-col gap-2">
          <InstallPWAButton />
          <H2>Vyjděte z otroctví svých faraónů</H2>
          <p className="py-4">
            Cítíte se vyčerpaní a uvěznění ve spirále moderních pokušení - jako je nekonečné procházení sociálních sítí,
            hledání útěchy v alkoholu, ztráta času u pornografie, nebo nekonečné sledování televize? Nadešel čas na
            změnu. Připojte se k nám v Exodus90 a objevte cestu k osobní svobodě a seberealizaci, daleko od těchto
            moderních faraónů, kteří vás svazují.
          </p>
          <p className="pb-4">
            Exodus90 je 90 denní duchovní cvičení, které vám pomůže získat kontrolu nad svým životem. Toto cvičení
            zahrnuje modlitbu, půst, cvičení a studium. Připojte se k nám a zažijte svobodu, kterou vám Bůh chce dát.
          </p>

          <Alert>
            <BookCopy className="h-5 w-5" />
            <AlertTitle className="text-xl font-bold">Dostupné verze textů</AlertTitle>
            <AlertDescription className="text-base">
              Pro duchovní cvičení nabízíme tři verze textů:
              <ul className="my-4 list-disc">
                <li>
                  <span className="font-bold">Verze 2024</span> - kompletní překlad, který si můžete stáhnout jako PDF
                  pro tisk nebo čtení offline.
                </li>
                <li>
                  <span className="font-bold">Verze 2025</span> - nový překlad, který průběžně doplňujeme přímo do
                  aplikace (výchozí verze).
                </li>
                <li>
                  <div className="">
                    <p>
                      <span className="font-bold">
                        Verze 2025 🇸🇰 Slovensko{" "}
                        <sup>
                          <BookPlus className="inline-block h-4 w-4 text-yellow-500" />
                        </sup>
                      </span>{" "}
                      - nový překlad pro bratry ze Slovenska, který průběžně doplňujeme přímo do aplikace.
                    </p>
                  </div>
                </li>
              </ul>
              Verzi si můžeš změnit v hlavičce aplikace. <br />
              <span className="italic">* Nezapomeň, je potřeba používat stejnou verzi jako tvé bratrstvo.</span>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </>
  );
}
