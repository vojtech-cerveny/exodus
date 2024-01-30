"use client";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Badge } from "./ui/badge";
import { RadioGroupItem } from "./ui/radio-group";

type MoodVersion = "GOOD" | "NEUTRAL" | "SAD";

export function ProgressToggleGroupItem({ mood, name }: { mood: MoodVersion; name: string }) {
  let style: string = "";
  switch (mood) {
    case "GOOD":
      style = "bg-green-100 hover:bg-green-300";
      break;
    case "NEUTRAL":
      style = "bg-yellow-100 hover:bg-yellow-300";
      break;
    case "SAD":
      style = "bg-red-100 hover:bg-red-300";
      break;
    default:
      break;
  }
  return (
    <div className={`flex items-center space-x-2 `}>
      <RadioGroupItem value={mood} id={mood + name}></RadioGroupItem>
      <Label htmlFor={mood + name}>
        <Badge variant="default" className={cn("w-max max-w-max", style)}>
          <img className="h-6 w-6" src={`/icons/mood-${mood.toLocaleLowerCase()}.svg`} />
        </Badge>
      </Label>
    </div>
  );
}
