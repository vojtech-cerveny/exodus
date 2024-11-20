"use client";

import { Label } from "@/components/ui/label";
import { handleCopyClick } from "@/lib/utils";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CopyLink({ link }: { link: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="sr-only">
          Link
        </Label>
        <Input id="link" defaultValue={link} readOnly />
      </div>
      <Button type="submit" size="sm" className="px-3" onClick={() => handleCopyClick(link, "Link")}>
        <span className="sr-only">Copy</span>
        <ClipboardCopyIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
