"use client";
import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function VersionSelect() {
  const [version, setVersion] = useLocalStorage("exodus-version", "2025");

  const selectVersion = (version: string) => {
    setVersion(version);
    toast("Verze Exodus90 byla změněna na " + version);
  };

  return (
    <div className="my-4 flex items-center justify-center space-x-4">
      <p> </p>
      <Select onValueChange={selectVersion}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={version} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
