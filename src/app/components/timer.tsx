"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
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
import { useEffect, useRef, useState } from "react";
import { H3 } from "./typography";

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
      "Je tichý čas na dialog s Pánem. Přineste mu vše, co je ve vašem srdci nebo co máte na mysli/ve vaší mysli. Během duchovního cvičení to budou často otázky z denní meditace. Podělte se s Pánem upřímně o své myšlenky a obavy. A co je nejdůležitější, dejte Pánu prostor reagovat, aby mohl odpovědět, a sami mlčte a v tichu na/poslouchejte.",
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
    }
  };

  const resetTimer = () => {
    setTimeLeft(parts![0].time);
    setCurrentIndex(0);
    setIsRunning(false);
    setStarted(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!started) {
      setStarted(true);
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
        newParts = svataHodina.map((part) => ({
          ...part,
          time: Math.round((part.time / 60) * 40),
        }));
        setDuration("40minutes");
        break;
      case "20minutes":
        newParts = svataHodina.map((part) => ({
          ...part,
          time: Math.round((part.time / 60) * 20),
        }));
        setDuration("20minutes");
        break;
    }
    setParts(newParts);
    setTimeLeft(newParts[0].time);
    setCurrentIndex(0);
    setIsRunning(false);
    setStarted(false);
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${("0" + (seconds % 60)).slice(-2)}`;
  };

  return (
    <div>
      <Drawer>
        {started && (
          <div className="w-full md:w-auto flex-1 flex-grow backdrop-blur fixed bottom-0 right-0 md:right-8 md:rounded-t flex dark:bg-zinc-800/30 bg-zinc-100/30  border-t md:border-l md:border-r dark:border-zinc-600/30 border-zinc-200/30 justify-center items-center p-2 transition-opacity duration-200">
            <div className="flex-1 md:flex-0">
              <DrawerTrigger className="left-0">
                <Button variant="ghost" size="icon">
                  <ChevronUpIcon className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
            </div>
            <div className="flex-1 md:flex-0">
              <h2 className="text-2xl px-4 font-bold tracking-tighter text-center  text-zinc-800 dark:text-zinc-200 ">
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
        <DrawerTrigger>
          {!started && (
            <div className="fixed bottom-0 right-12 backdrop-blur-sm rounded-t flex dark:bg-zinc-800/30 bg-zinc-100/30  border-t border-l border-r dark:border-zinc-600 border-zinc-200 justify-center items-center p-2 transition-opacity duration-200">
              <Button className="py-4" variant={"outline"}>
                <LapTimerIcon />
              </Button>
            </div>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription>
              <div className="mx-auto w-full max-w-sm">
                {started ? (
                  <div>
                    <H3>{parts[currentIndex].title}</H3>
                    <p>{parts[currentIndex].description}</p>
                  </div>
                ) : (
                  <div>
                    <p>
                      Tenhle časovač Tě provede svatou hodinou, bude Ti hlídat čas a nabídne Ti pomoct jak daný čas
                      strávit. Jakmile budeš připraven, klikni na tlačítko níže a začni.{" "}
                    </p>
                    <p>Časovač pojede dokud nezmáčkneš červené tlačítko nebo dokud nedoběhne čas.</p>
                    <p>Tento panel můžeš minimalizovat a číst si texty na den.</p>
                    <hr className="m-4" />
                    <div className="flex items-center space-x-2">
                      <p>Chci se modlit</p>
                      <Select defaultValue={duration} onValueChange={changeDuration}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hour">Hodinu</SelectItem>
                          <SelectItem value="40minutes">40 minut</SelectItem>
                          <SelectItem value="20minutes">20 minut</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <hr className="m-4" />
                    <H3>Části svaté hodiny</H3>
                    <Accordion type="single" collapsible>
                      {parts.map((part, index) => {
                        return (
                          <AccordionItem value={`${index}`} key={index}>
                            <AccordionTrigger>
                              {part.title} - {formatTime(part.time)}
                            </AccordionTrigger>
                            <AccordionContent>{part.description}</AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                )}
                <h2 className="text-5xl font-bold tracking-tighter text-center">{formatTime(timeLeft)}</h2>
                <div className="mt-auto grid grid-cols-3 gap-2 py-4">
                  <Button onClick={toggleTimer} variant="outline">
                    {isRunning ? (
                      <>
                        <PauseIcon />
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                      </>
                    )}
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
              <Button variant={"outline"} size={"sm"} className="text-zinc-800 dark:text-zinc-200 fixed right-4 top-4">
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
