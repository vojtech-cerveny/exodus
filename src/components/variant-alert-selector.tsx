"use client";

import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { BookCopy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function VariantAlertSelector() {
  const [version, setVersion] = useLocalStorage("exodus-version", "2025");

  const selectVersion = (version: string) => {
    setVersion(version);
  };

  return (
    <>
      <Alert variant={"default"}>
        <BookCopy className="h-4 w-4" />
        <AlertTitle className="text-xl">Pozor!</AlertTitle>
        <AlertDescription className="text-base">
          Máme dvě verze Exodus90! Verze 2024 je již přeložená, připravená pro tisk a pro čtečky. Verze 2025 se
          momentálně překládá (texty budeme uvolňovat postupně dle anglického originálu), ale je nejaktuálnější.
        </AlertDescription>
      </Alert>
      <div className="my-4 flex items-center justify-center space-x-4">
        <p> Vyber si svou verzi:</p>
        <Select onValueChange={selectVersion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={version} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
