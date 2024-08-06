import InstallPWAButton from "@/components/install-pwa-button";
import { unstable_noStore } from "next/cache";
import { Progress } from "../components/circle-progress";
import { H2 } from "../components/typography";
import { countDaysFromJan1PlusOne } from "./utils/date";

export default function Home() {
  unstable_noStore();

  return (
    <>
      <main className="flex-1">
        <div className="flex h-full w-full max-w-2xl flex-col gap-2">
          <InstallPWAButton />
          <H2>Uvolněte pouta svých faraónů</H2>
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
          {countDaysFromJan1PlusOne() <= 91 && <Progress progress={(countDaysFromJan1PlusOne() / 90) * 100} />}
        </div>
      </main>
    </>
  );
}
