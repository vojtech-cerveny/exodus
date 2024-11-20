"use client";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Badge } from "../ui/badge";
import { RadioGroupItem } from "../ui/radio-group";

type MoodVersion = "GOOD" | "NEUTRAL" | "SAD";

export function ProgressToggleGroupItem({ mood, name }: { mood: MoodVersion; name: string }) {
  let style: string = "";
  switch (mood) {
    case "GOOD":
      style = "bg-green-500/80 hover:bg-green-500/90";
      break;
    case "NEUTRAL":
      style = "bg-yellow-500/80 hover:bg-yellow-500/90";
      break;
    case "SAD":
      style = "bg-red-500/80 hover:bg-red-500/90";
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
