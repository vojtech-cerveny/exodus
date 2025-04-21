"use client";

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createBookmarkAction } from "@/domain/bookmark/bookmark-action";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "../submit-button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

export function CreateBookmarkContent({ selection }: { selection: string }) {
  const { data: session } = useSession();
  const path = usePathname();

  // Construct the correct URL for daily texts page
  let bookmarkUrl = path;
  // TODO: This is a hack to get the correct URL for the daily texts page
  // if (path.endsWith("/dnesni-texty")) {
  //   const status = getEventStatus("EXODUS");
  //   const pathParts = path.split("/");
  //   const version = pathParts[pathParts.length - 2];
  //   bookmarkUrl = `/exodus/${version}/${status.currentDays}`;
  // }

  const handleSubmit = async (formData: FormData) => {
    const result = await createBookmarkAction(formData);
    console.log(result);
    if (result.success) {
      toast("Záložka byla vytvořena.");
    } else {
      toast("Nepodařilo se vytvořit záložku.");
    }
  };

  return (
    <DialogContent className="rounded-md">
      <form action={handleSubmit} className="">
        <DialogHeader>
          <DialogTitle>Vytvořit záložku</DialogTitle>
          <DialogDescription>
            <blockquote className="mt-4 italic lg:mt-6 lg:border-l-2 lg:pl-6 dark:border-l-gray-600">
              {selection?.toString()}
            </blockquote>
            <div className="mt-4 grid w-full items-center gap-1.5">
              <Label htmlFor="note">Poznámka</Label>
              <Textarea id="note" name="note" className="dark:border-border dark:focus:border-border/40!" />
            </div>
            <div className="dark:border-border mt-4 flex flex-row items-center justify-between rounded-lg border p-4">
              <Label htmlFor="note">Sdílet s bratrstvem</Label>
              <Switch id="sharedWithBrotherhood" name="sharedWithBrotherhood" />
            </div>
            <input hidden name="userId" value={session?.user?.id} />
            <input hidden name="url" value={bookmarkUrl} />
            <input hidden name="passage" value={selection} />
            <input hidden name="type" value="bible" />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <SubmitButton disabled={!session}>{session ? "Vytvořit" : "Musíš se prvně přihlásit"}</SubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
