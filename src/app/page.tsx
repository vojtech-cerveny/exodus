import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Progress } from "../components/circle-progress";
import { H2 } from "../components/typography";
import { countDaysFromJan1PlusOne } from "./utils/date";

export default function Home() {
  unstable_noStore();

  return (
    <>
      <main className="flex-1">
        <div className="flex h-full w-full max-w-2xl flex-col gap-2">
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

          <Progress progress={(countDaysFromJan1PlusOne() / 90) * 100} />
        </div>
      </main>
      <footer className="m-4 mt-[50px] flex-shrink-0 bg-white dark:bg-gray-800">
        <div className="mx-auto w-full  max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024
            <a href="https://verici.dev/" className="hover:underline">
              VERICI.DEV
            </a>
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <Link href="/privacy?lang=cz" className="me-4 hover:underline md:me-6">
                Zásady ochrany osobních údajů
              </Link>
            </li>
            <li>
              <a href="/terms-of-service?lang=cz" className="me-4 hover:underline md:me-6">
                Podmínky užití
              </a>
            </li>
            <li>
              <a href="mailto:cervik49@gmail.com" className="hover:underline">
                Kontakt
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
