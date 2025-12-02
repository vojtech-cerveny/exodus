"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

interface ShutdownLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShutdownLetterModal: React.FC<ShutdownLetterModalProps> = ({ isOpen, onClose }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const localStorageKey = "shutdownLetterAccepted";

  useEffect(() => {
    const accepted = localStorage.getItem(localStorageKey);
    setHasAccepted(!!accepted);
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const scrolledToBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50; // 50px threshold

    if (scrolledToBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    localStorage.setItem(localStorageKey, new Date().toISOString());
    setHasAccepted(true);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && hasAccepted) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen && !hasAccepted} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[100vh] max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Důležité oznámení o přechodu na oficiální aplikaci</DialogTitle>
          <DialogDescription>Přečtěte si prosím celé oznámení před pokračováním</DialogDescription>
        </DialogHeader>

        <div className="h-[70vh] overflow-y-auto pr-4" onScroll={handleScroll}>
          <div className="space-y-4">
            <p className="font-semibold">Pokoj vám, bratři,</p>

            <p>
              Jak víte, doposud nebyla duchovní cvičení Exodus90, která se zrodila ve Spojených státech, oficiálně
              dostupná v naší mateřštině. Řadu let jsme je díky shovívavosti amerických duchovních otců zakladatelů a
              svépomocnému úsilí dobrovolníků zprostředkovávali v té nejlepší provizorní podobě, které jsme byli
              schopni.
            </p>

            <p>
              Nyní vám s radostí oznamujeme, že po několika letech vyjednávání a domlouvání se český a slovenský Exodus
              stávají oficiálním členem celosvětové rodiny E90 se všemi výhodami, které to přináší. Nyní budeme mít
              obsah Exodu dostupný v češtině a slovenštině skrze oficiální apku a současně získáme možnost autorům Exodu
              vyjádřit vděčnost, požehnat do další existence a hmotně podpořit ročním předplatným toto Bohulibé dílo
              (jehož výhod jsme řadu let požívali zcela zdarma ;-).
            </p>

            <p>
              Jak víte, duchovní cvičení Exodus probíhají celoročně v sezónách (Exodus 90 dní, Velikonoční doba,
              Královské léto, Bitvy podzimu atd.) Tyto sezóny jsou dostupné prostřednictvím celoročního předplatného v
              aplikaci pro chytré telefony (Android i iPhone). Aktuální americké předplatné činí 90 dolarů, pro české a
              slovenské chlapy však bude za zvýhodněných podmínek. Pro české bratry je cena 1150Kč na rok (což vychází
              na necelá dvě piva v hospodě měsíčně; ve srovnání s tím, kolik peněz cvičení Exodus šetří a jaká duchovní
              požehnání přináší, to vskutku není mnoho ;-).
            </p>

            <h3 className="pt-2 text-base font-semibold">Stručně zmiňme alespoň některé z výhod:</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>originální aplikace nabídne větší funkcionalitu,</li>
              <li>přináší nový duchovní text na každý den jako duchovní manu z nebe,</li>
              <li>bude znamenat přímou podporu USA týmu pro Exodus komunity v ČR a SR.</li>
            </ul>

            <p className="pt-2">
              Trvalá podpora češtiny v aplikaci je spuštěna počínaje Exodus Adventem. Slovenština se přidá od ledna
              počínaje cvičením Exodus 90.
            </p>

            <div className="bg-muted/30 my-6 border-t border-b py-4">
              <p className="text-base font-semibold">
                Tato aplikace zanikne s novým rokem 2026 a nebude již dostupná. Prosím přejděte na oficiální aplikaci.
              </p>
              <p className="mt-2">
                Více informací najdete na našem webu{" "}
                <a
                  href="https://exodus90.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:no-underline"
                >
                  exodus90.cz
                </a>
              </p>
            </div>

            <p className="pt-4 font-semibold">Požehnané dny!</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <div className="text-muted-foreground flex flex-1 items-center gap-2 text-xs">
            {hasScrolledToBottom ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckIcon className="h-4 w-4" />
                <span>Přečteno</span>
              </div>
            ) : (
              <span>Prosím, přečtěte si celé oznámení (posuňte dolů)</span>
            )}
          </div>
          <Button onClick={handleAccept} disabled={!hasScrolledToBottom} className="w-full sm:w-auto">
            Rozumím a beru na vědomí
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
