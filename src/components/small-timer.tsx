"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

const timerMessageFromTheField = {
  time: 90,
};

const SmallTimer = ({
  audioSrc,
}: {
  parts?: { time: number; title: string; description: string }[];
  audioSrc: string;
}) => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerMessageFromTheField.time);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: any;

    if (isRunning) {
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
  }, [isRunning, timeLeft, currentIndex, timerMessageFromTheField]);

  const finishPart = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setTimeLeft(timerMessageFromTheField.time);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(timerMessageFromTheField.time);
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

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${("0" + (seconds % 60)).slice(-2)}`;
  };

  return (
    <>
      <h2
        className={cn(
          "text-center text-8xl font-bold tracking-tighter",
          isRunning ? "text-red-700 duration-90000 dark:text-red-300" : "duration-0",
        )}
      >
        {formatTime(timeLeft)}
      </h2>
      <div className="mx-auto flex w-2/3 space-x-2 py-4 md:w-1/2">
        <Button onClick={toggleTimer} className="w-1/2" variant="default">
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
        <Button variant={"outline"} className="w-1/2" onClick={resetTimer}>
          <StopIcon className="h-4 w-4" />
        </Button>
      </div>

      <audio ref={audioRef} src={audioSrc} />
    </>
  );
};

export default SmallTimer;
