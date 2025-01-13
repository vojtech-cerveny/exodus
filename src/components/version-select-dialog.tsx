"use client";

import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { H2 } from "./typography";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { VersionSelectUi } from "./versionSelect-ui";

export function VersionSelectDialog({ versions }: { versions: any[] }) {
  const [open, setOpen] = useState(false);
  const [version, setVersion, isLoading] = useLocalStorage("exodus-version", null);

  useEffect(() => {
    if (!version && !isLoading) {
      setOpen(true);
    }
  }, [version, isLoading]);

  const handleClose = () => {
    if (!version) {
      // If no version is selected, pick the first one
      setVersion(versions[1]);
    }
    setOpen(false);
  };

  const handleVersionWord = () => {
    if (versions.length === 1) {
      return "verzi";
    }
    if (versions.length === 2 || versions.length === 3 || versions.length === 4) {
      return "verze";
    }
    return "verzí";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md sm:text-justify">
        <DialogHeader>
          <DialogTitle>
            <H2 className="mt-0">Výběr verze textů</H2>
          </DialogTitle>
          <DialogDescription>
            Máme {versions.length} {handleVersionWord()} Exodus90!
            <ul className="mt-4 list-inside list-disc space-y-2 text-justify">
              <li>Verze 2024 je již přeložená, připravená pro tisk a pro čtečky. Má taktéž týdenní aktivity(úkony).</li>
              <li>
                Verze 2025 se momentálně překládá (texty budeme uvolňovat postupně dle anglického originálu), ale je
                nejaktuálnější.
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <VersionSelectUi onVersionSelect={() => setOpen(false)} versions={versions} />
      </DialogContent>
    </Dialog>
  );
}
