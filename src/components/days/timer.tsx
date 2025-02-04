"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChevronUpIcon,
  Cross2Icon,
  LapTimerIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
  TrackNextIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import NoSleep from "nosleep.js";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";

const svataHodina = [
  {
    time: 5 * 60,
    title: "Úvod",
    description:
      "Toto je čas slovní modlitby před Pánem. Proste Pána o milosrdenství za své hříchy a chvalte jeho slavné jméno.",
  },
  {
    time: 15 * 60,
    title: "Duchovní čtení",
    description:
      "Během duchovního cvičení bude tento čas pravděpodobně zahrnovat vaši denní reflexi Exodus 90  (Denní úkony, Písmo a meditace).",
  },
  {
    time: 20 * 60,
    title: "Kontemplativní modlitba",
    description:
      "Je tichý čas na dialog s Pánem. Přineste mu vše, co je ve vašem srdci nebo co máte na mysli/ve vaší mysli. Během duchovního cvičení to budou často otázky z denní meditace. Podělte se s Pánem upřímně o své myšlenky a obavy. A co je nejdůležitější, dejte Pánu prostor reagovat, aby mohl odpovědět, a sami mlčte a v tichu na/poslouchejte.",
  },
  {
    time: 15 * 60,
    title: "Přímluva",
    description:
      "Udělejte si čas, abyste přednesli Pánu své modlitby/prosby. Modlete se za své vlastní vysvobození, svou rodinu, své bratrstvo, církev a všechny další modlitby/ prosby, které můžete mít.",
  },
  {
    time: 5 * 60,
    title: "Díkůvzdání",
    description:
      "Učiňte upřímnou modlitbu chvály a díkůvzdání před Pánem. Každý den musíme být vděční. Důsledné uznávání Božích darů a milostí přináší do života větší pocit vděčnosti a radosti. Dej Pánu chválu, která je platná/náležitá/patřičná (dej Pánu náležitou chválu).",
  },
  {
    time: 2 * 60,
    title: "Ukončení",
    description:
      "Ukončete modlitbu tím, že požádáte (na závěr požádejte) Pannu Marii a další svaté, aby se za vás celý den přimlouvali, stejně jako žádáte své bratry, aby se za vás každý den modlili.",
  },
];

const Timer = ({ audioSrc }: { parts?: { time: number; title: string; description: string }[]; audioSrc: string }) => {
  const [parts, setParts] = useState(svataHodina);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(parts[0].time);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState("hour");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [noSleepInstance] = useState(new NoSleep());

  useEffect(() => {
    let interval: any;

    if (isRunning && currentIndex < parts!.length) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(interval);
          finishPart();
        }
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentIndex, parts]);

  const finishPart = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (currentIndex + 1 < parts!.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(parts![currentIndex + 1].time);
    } else {
      setIsRunning(false);
      noSleepInstance.disable();
    }
  };

  const resetTimer = () => {
    setTimeLeft(parts![0].time);
    setCurrentIndex(0);
    setIsRunning(false);
    setStarted(false);
    noSleepInstance.disable();
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (started) {
      noSleepInstance.disable();
    }

    if (!started) {
      setStarted(true);
      noSleepInstance.enable();
    }
  };

  const nextPart = () => {
    if (currentIndex + 1 < parts!.length) {
      finishPart();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const changeDuration = (value: string) => {
    let newParts: { time: number; title: string; description: string }[] = [];

    switch (value) {
      case "hour":
        newParts = svataHodina;
        setDuration("hour");
        break;
      case "40minutes":
        newParts = adjustPartsForDuration(40 * 60, 20 * 60);
        setDuration("40minutes");
        break;
      case "30minutes":
        newParts = adjustPartsForDuration(30 * 60, 20 * 60);
        setDuration("30minutes");
        break;
    }

    setParts(newParts);
    setTimeLeft(newParts[0].time);
    setCurrentIndex(0);
    setIsRunning(false);
    setStarted(false);
  };

  const adjustPartsForDuration = (totalDuration: number, kontemplativniDuration: number) => {
    const kontemplativniIndex = svataHodina.findIndex((part) => part.title === "Kontemplativní modlitba");
    const remainingTime = totalDuration - kontemplativniDuration;

    let adjustedParts = svataHodina.map((part, index) => {
      if (index === kontemplativniIndex) {
        return { ...part, time: kontemplativniDuration };
      } else {
        const originalWeight =
          part.time / svataHodina.reduce((sum, p, i) => (i !== kontemplativniIndex ? sum + p.time : sum), 0);
        return { ...part, time: Math.round(remainingTime * originalWeight) };
      }
    });

    // Round times to nearest 30 seconds
    adjustedParts = adjustedParts.map((part) => ({
      ...part,
      time: Math.round(part.time / 30) * 30,
    }));

    // Adjust total time to match desired duration
    const totalAdjustedTime = adjustedParts.reduce((sum, part) => sum + part.time, 0);
    const difference = totalDuration - totalAdjustedTime;

    if (difference !== 0) {
      const indexToAdjust = adjustedParts.findIndex((part, index) => index !== kontemplativniIndex);
      if (indexToAdjust !== -1) {
        adjustedParts[indexToAdjust].time += difference;
      }
    }

    return adjustedParts;
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${("0" + (seconds % 60)).slice(-2)}`;
  };

  return (
    <div>
      <Drawer>
        {started && (
          <div className="fixed bottom-0 right-0 flex w-full flex-1 flex-grow items-center justify-center border-t border-zinc-200/30 bg-zinc-100/30 p-2 pb-[calc(0.2rem+env(safe-area-inset-bottom))] backdrop-blur transition-opacity duration-200 md:right-8 md:w-auto md:rounded-t md:border-l md:border-r dark:border-zinc-600/30 dark:bg-zinc-800/30">
            <div className="md:flex-0 flex-0">
              <DrawerTrigger className="left-0" asChild>
                <Button variant="ghost" size="icon">
                  <ChevronUpIcon className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
            </div>
            <div className="md:flex-0 flex-1">
              <h2 className="px-4 text-center text-2xl font-bold tracking-tighter text-zinc-800 dark:text-zinc-200">
                {formatTime(timeLeft)}
              </h2>
            </div>
            <div className="space-x-1 pl-1">
              {!isRunning ? (
                <Button variant="outline" size="icon" onClick={toggleTimer}>
                  <PlayIcon className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" size="icon" onClick={toggleTimer}>
                  <PauseIcon className="h-4 w-4" />
                </Button>
              )}
              <Button variant="outline" size="icon" onClick={nextPart}>
                <TrackNextIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={resetTimer}>
                <StopIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <DrawerTrigger asChild>
          {!started && (
            <div className="fixed bottom-0 right-12 flex items-center justify-center rounded-t border-l border-r border-t border-zinc-200 bg-zinc-100/30 p-2 pb-[calc(0.2rem+env(safe-area-inset-bottom))] backdrop-blur-sm transition-opacity duration-200 dark:border-zinc-600 dark:bg-zinc-800/30">
              <Button className="py-4" variant={"outline"}>
                <LapTimerIcon />
              </Button>
            </div>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="hidden">Svata hodina</DrawerTitle>
          <DrawerHeader>
            <DrawerDescription>
              <div className="mx-auto w-full max-w-sm">
                {started ? (
                  <div>
                    <div className="text-2xl font-bold tracking-tighter">{parts[currentIndex].title}</div>
                    <div>{parts[currentIndex].description}</div>
                  </div>
                ) : (
                  <div>
                    <div>
                      Tento časovač Tě provede svatou hodinou, bude Ti hlídat čas a nabídne Ti pomoct jak daný čas
                      strávit dle{" "}
                      <Link
                        className="underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-ring"
                        href={"/articles/exodus90-jak-se-modlit-svatou-hodinu"}
                      >
                        Jak se modlit svatou hodinu
                      </Link>
                      . Jakmile budeš připraven, klikni na tlačítko níže a začni.
                    </div>
                    <div className="py-2 font-extrabold">
                      Časovač pojede dokud nezmáčkneš stop tlačítko nebo dokud nedoběhne čas.
                    </div>
                    <div>Tento panel můžeš minimalizovat a číst si texty na den.</div>
                    <Separator className="m-4" />
                    <div className="flex items-center space-x-2">
                      <div>Chci se modlit</div>
                      <Select defaultValue={duration} onValueChange={changeDuration}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hour">Hodinu</SelectItem>
                          <SelectItem value="40minutes">40 minut</SelectItem>
                          <SelectItem value="30minutes">30 minut</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator className="m-4" />
                  </div>
                )}
                {started && (
                  <div className="text-center text-5xl font-bold tracking-tighter">{formatTime(timeLeft)}</div>
                )}
                <div
                  className={started ? "mt-auto grid grid-cols-3 gap-2 py-4" : "mt-auto grid grid-cols-1 gap-2 py-4"}
                >
                  <Button onClick={toggleTimer} variant={started ? "outline" : "default"}>
                    {isRunning ? <PauseIcon /> : <PlayIcon />}
                  </Button>
                  <Button className={started ? "" : "hidden"} variant={"outline"} onClick={nextPart}>
                    <TrackNextIcon className="h-4 w-4" />
                  </Button>
                  <Button className={started ? "" : "hidden"} variant={"destructive"} onClick={resetTimer}>
                    <StopIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant={"outline"} size={"sm"} className="fixed right-4 top-4">
                <Cross2Icon />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default Timer;
