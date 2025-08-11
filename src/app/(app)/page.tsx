import InstallPWAButton from "@/components/install-pwa-button";
import { unstable_noStore } from "next/cache";

import { H2 } from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BookCopy, List } from "lucide-react";
import Link from "next/link";

export default function Home() {
  unstable_noStore();

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

          <div className="flex justify-center pb-4">
            <Link href="/exercises">
              <Button className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Zobrazit všechna cvičení
              </Button>
            </Link>
          </div>

          <Alert>
            <BookCopy className="h-5 w-5" />
            <AlertTitle className="text-xl font-bold">Dostupné verze textů</AlertTitle>
            <AlertDescription className="text-base">
              Pokud chceš využít jiný překlad, než akuální, můžeš si nastavit jiný po přihlášení a kliknutí na svůj
              avatar a v nastavení nastavit jinou verzi.
              <br />
              Pokud chceš používat slovenštinu, stačí změnit změnit ikonku v hlavičce aplikace. Pokud bude dostupný
              slovenský překlad, pak Ti zobrazíme slovenský překlad.
              <span className="italic">* Nezapomeň, je potřeba používat stejnou verzi jako tvé bratrstvo.</span>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </>
  );
}
