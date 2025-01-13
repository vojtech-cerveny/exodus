import InstallPWAButton from "@/components/install-pwa-button";
import { unstable_noStore } from "next/cache";

import { constants } from "./constants";
import { getEventStatus } from "./utils/date";

import { Progress } from "@/components/circle-progress";
import { H2, H3 } from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BookCopy } from "lucide-react";
import Link from "next/link";

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

          {exodus.isRunning && (
            <>
              <H3>Právě běží Exodus90</H3>
              <Progress progress={(exodus.currentDays / constants.EXODUS.DURATION) * 100} />
              <Link href="/exodus/dnesni-texty">
                <Button className="w-full">Přejít na dnešní den</Button>
              </Link>
            </>
          )}

          {krLeto.isRunning && (
            <>
              <H3 className="mt-6">Právě běží Královské léto</H3>
              <Progress progress={(krLeto.currentDays / constants.KRALOVSKE_LETO.DURATION) * 100} />
              <Link href="/kralovske-leto/dnesni-texty">
                <Button className="w-full">Přejít na dnešní den</Button>
              </Link>
            </>
          )}

          <Alert>
            <BookCopy className="h-5 w-5" />
            <AlertTitle className="text-xl font-bold">Dostupné verze textů</AlertTitle>
            <AlertDescription className="text-base">
              Pro duchovní cvičení nabízíme dvě verze textů:
              <ul className="my-4 list-disc">
                <li>
                  <span className="font-bold">Verze 2024</span> - kompletní překlad, který si můžete stáhnout jako PDF
                  pro tisk nebo čtení offline.
                </li>
                <li>
                  <span className="font-bold">Verze 2025</span> - nový překlad, který průběžně doplňujeme přímo do
                  aplikace (výchozí verze)
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
