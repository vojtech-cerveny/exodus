"use client";
import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Version } from "@/payload-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface VersionSelectUiProps {
  versions: Version[];
}

export function VersionSelectUi({ versions }: VersionSelectUiProps) {
  const [version, setVersion] = useLocalStorage("exodus-version", {
    slug: "2025",
    displayName: "2025",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const selectVersion = (slug: string) => {
    const selectedVersion = versions.find((v) => v.slug === slug)!;
    setVersion({
      slug: selectedVersion.slug,
      displayName: selectedVersion.displayName,
    });
    toast("Verze Exodus90 byla změněna na " + selectedVersion.displayName);
  };

  if (isLoading) {
    return null; // or return a skeleton/loading state if preferred
  }

  return (
    <div className="my-4 flex items-center justify-center space-x-4">
      <Select onValueChange={selectVersion}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={version.displayName} />
        </SelectTrigger>
        <SelectContent>
          {versions.map((v) => (
            <SelectItem key={v.slug} value={v.slug}>
              {v.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
