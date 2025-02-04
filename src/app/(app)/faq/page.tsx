import { H2, H3, Paragraph } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileIcon } from "@radix-ui/react-icons";
import { ComputerIcon } from "lucide-react";

export const metadata = {
  title: "Jak používat aplikaci | Exodus90",
  description: "Návod k používání aplikace Exodus90 - instalace, nastavení a tipy pro používání.",
};

export default function FAQPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <H2 className="mb-8">Jak používat aplikaci</H2>

      <div className="space-y-6">
        <section>
          <Card className="p-6">
            <H3 className="mb-6 mt-0">Instalace aplikace na zařízení</H3>

            <Tabs defaultValue="android" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="android" className="flex items-center gap-2">
                  <MobileIcon className="h-5 w-5" />
                  Android
                </TabsTrigger>
                <TabsTrigger value="ios" className="flex items-center gap-2">
                  <ComputerIcon className="h-5 w-5" />
                  iOS
                </TabsTrigger>
              </TabsList>
              <TabsContent value="android">
                <div className="rounded-lg bg-muted/50 p-4">
                  <Paragraph className="mt-0">
                    Na Androidu stačí potvrdit instalaci, když vám webový prohlížeč nabídne možnost &quot;Nainstalovat
                    aplikaci&quot;. Aplikace se pak nainstaluje jako běžná Android aplikace a bude dostupná z plochy
                    vašeho zařízení.
                  </Paragraph>
                </div>
              </TabsContent>
              <TabsContent value="ios">
                <div className="rounded-lg bg-muted/50 p-4">
                  <Paragraph className="mt-0">Pro instalaci na iOS zařízení:</Paragraph>
                  <ol className="my-4 list-decimal space-y-2 pl-6">
                    <li>Otevřete stránku v prohlížeči Safari</li>
                    <li>Klepněte na tlačítko Sdílet (čtverec s šipkou) ve spodní části obrazovky</li>
                    <li>Vyberte možnost &quot;Přidat na plochu&quot;</li>
                    <li>Potvrďte přidání</li>
                  </ol>
                  <Paragraph className="mb-0">
                    Aplikace se objeví na ploše vašeho iOS zařízení jako samostatná aplikace.
                  </Paragraph>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </section>

        <section>
          <Card className="p-6">
            <H3 className="mb-4 mt-0">Verze textů</H3>
            <div className="rounded-lg bg-muted/50 p-4">
              <Paragraph className="mt-0">
                V aplikaci máme k dispozici několik verzí textů. Je důležité používat stejnou verzi jako vaše bratrstvo.
                Výchozí nastavení je nejnovější verze (2025).
              </Paragraph>
              <Paragraph className="mb-0">
                Verzi můžete změnit pomocí přepínače v horní části aplikace. Vybraná verze se automaticky uloží pro
                příští návštěvy na daném zařízení a bude nabízet právě tuto verzi textů v navigaci.
              </Paragraph>
            </div>
          </Card>
        </section>

        <section>
          <Card className="p-6">
            <H3 className="mb-4 mt-0">Záložky</H3>
            <div className="rounded-lg bg-muted/50 p-4">
              <Paragraph className="mt-0">
                Po přihlášení do aplikace si můžeš vytvořit záložky. Jednoduše si označ text, který si chceš uložit a
                pravým tlačítkem aktivuj menu a vyber &quot;Vytvořit záložku&quot;. Záložky se pak zobrazí v sekci
                &quot;Záložky&quot; v navigaci.
              </Paragraph>
              <Paragraph className="mb-0">
                Danou záložku můžeš sdílet s celým bratrstvem a podělit se tak o ni. Samozřejmostí je přidání i
                komentáře.
              </Paragraph>
            </div>
          </Card>
        </section>

        <section>
          <Card className="p-6">
            <H3 className="mb-4 mt-0">Přizpůsobení zobrazení</H3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 mt-0 text-2xl font-bold">Velikost písma</h4>
                <Paragraph className="mb-0">
                  Pro lepší čitelnost můžete upravit velikost písma pomocí tlačítka v horní části aplikace. K dispozici
                  jsou tři velikosti: malá, střední a velká.
                </Paragraph>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 mt-0 text-2xl font-bold">Tmavý režim</h4>
                <Paragraph className="mb-0">
                  Aplikace podporuje světlý a tmavý režim. Můžete si vybrat preferovaný režim nebo nechat aplikaci, aby
                  se přizpůsobila nastavení vašeho systému.
                </Paragraph>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <Card className="p-6">
            <H3 className="mb-4 mt-0">Rychlý přístup k denním textům</H3>
            <div className="rounded-lg bg-muted/50 p-4">
              <Paragraph className="mt-0">
                Pro rychlý přístup k textům na aktuální den si danou stránku můžete uložit jako záložku.
              </Paragraph>
              <Paragraph className="mb-0">
                Po otevření této adresy budete automaticky přesměrováni na texty pro aktuální den ve vámi vybrané verzi
                duchovního cvičení. Tuto adresu si můžete uložit jako záložku nebo přidat na domovskou obrazovku vašeho
                zařízení pro rychlý přístup.
              </Paragraph>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
