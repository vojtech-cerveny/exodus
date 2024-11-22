import InstallPWAButton from "@/components/install-pwa-button";
import { unstable_noStore } from "next/cache";
import { Progress } from "../../components/circle-progress";
import { H2, H3 } from "../../components/typography";
import { constants } from "./constants";
import { getEventStatus } from "./utils/date";

import { Button } from "@/components/ui/button";
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
          <H2>Vyjděte z otroctví svých faraonů </H2>
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
              <Link href="/exodus/today">
                <Button className="w-full">Přejít na dnešní den</Button>
              </Link>
            </>
          )}

          {krLeto.isRunning && (
            <>
              <H3 className="mt-6">Právě běží Královské léto</H3>
              <Progress progress={(krLeto.currentDays / constants.KRALOVSKE_LETO.DURATION) * 100} />
              <Link href="/kralovske-leto/today">
                <Button className="w-full">Přejít na dnešní den</Button>
              </Link>
            </>
          )}

          <div className="mt-6">
            <H3>Prozkoumejte aplikaci</H3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <Link href="/exodus">
                <Button className="w-full">Exodus90</Button>
              </Link>
              <Link href="/exodus/dny">
                <Button variant="outline" className="w-full">
                  Seznam dní
                </Button>
              </Link>
              <Link href="/exodus/ukony">
                <Button variant="outline" className="w-full">
                  Týdenní úkony
                </Button>
              </Link>
              <Link href="/articles">
                <Button variant="outline" className="w-full">
                  Průvodce Exodem
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
