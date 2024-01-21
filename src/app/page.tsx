import { Button } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Progress } from "./components/circle-progress";
import { H2, H3 } from "./components/typography";
import { countDaysFromJan1PlusOne } from "./utils/date";

export default function Home() {
  unstable_noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <H2>Uvolněte pouta svých faraónů.</H2>
        <p className="py-4">
          Cítíte se vyčerpaní a uvěznění ve spirále moderních pokušení - jako je nekonečné procházení sociálních sítí,
          hledání útěchy v alkoholu, ztráta času u pornografie, nebo nekonečné sledování televize? Nadešel čas na změnu.
          Připojte se k nám v Exodus90 a objevte cestu k osobní svobodě a seberealizaci, daleko od těchto moderních
          faraónů, kteří vás svazují.
        </p>
        <p className="pb-4">
          Exodus90 je 90 denní duchovní cvičení, které vám pomůže získat kontrolu nad svým životem. Toto cvičení
          zahrnuje modlitbu, půst, cvičení a studium. Připojte se k nám a zažijte svobodu, kterou vám Bůh chce dát.
        </p>

        <Progress progress={(countDaysFromJan1PlusOne() / 90) * 100} />

        <H3>Denní texty</H3>
        <div className="container flex flex-col justify-evenly gap-2 md:flex-row">
          <Button>
            <Link href="/days">OTEVŘI SEZNAM DNÍ</Link>
          </Button>
          <Button>
            <Link href={`/days/today`}>OTEVŘI DNEŠNÍ ROZJÍMÁNÍ</Link>
          </Button>
        </div>

        <H3>Články</H3>
        <div className="container flex flex-col justify-evenly gap-2 md:flex-row">
          <Button>
            <Link href="/articles">OTEVŘI SEZNAM ČLÁNKŮ</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
