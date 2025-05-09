"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

import { ProgressToggleGroupItem } from "./progress-toggle-group-item";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import createMemberProgressAction from "@/domain/brotherhood-progress/brotherhood-progress-action";
import { BrotherhoodProgress } from "@prisma/client";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import SubmitButton from "../submit-button";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

export default function ProgressUpdateCard({
  variant = "full",
  onUpdate,
  memberProgress,
}: {
  variant?: "small" | "full";
  onUpdate?: () => void;
  memberProgress: BrotherhoodProgress | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    try {
      const result = await createMemberProgressAction(formData);
      if (result.success) {
        toast.success("Tvůj den byl uložen a sdílen s bratrstvem!");
        setIsOpen(false);
        onUpdate?.();
      } else {
        toast.error("Něco se pokazilo");
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {variant === "full" ? (
          <Button className="">Můj den</Button>
        ) : (
          <Button size="icon" className="h-9 w-9">
            <PlusIcon className="h-5 w-5" />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <form action={handleUpdate}>
          <DrawerHeader>
            <DrawerTitle className="flex justify-center pb-4">Zadej update Tvého dne</DrawerTitle>
            <DrawerDescription>
              <div className="mx-auto grid max-w-2xl grid-cols-1 items-center justify-center gap-4 md:grid-cols-6">
                <div className="items-left col-span-2 flex flex-col justify-center space-y-4 pl-0 md:pl-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="shower" name="shower" defaultChecked={memberProgress?.shower === "DONE"} />
                    <Label className="leading-none font-medium" htmlFor="shower">
                      Sprcha
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exercise" name="exercise" defaultChecked={memberProgress?.exercise === "DONE"} />
                    <Label className="leading-none font-medium" htmlFor="exercise">
                      Cvičení
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="asceticism"
                      name="asceticism"
                      defaultChecked={memberProgress?.asceticism === "DONE"}
                    />
                    <Label className="leading-none font-medium" htmlFor="asceticism">
                      Askeze
                    </Label>
                  </div>
                </div>
                <div className="items-left flex flex-col md:col-span-4 md:items-center">
                  <div className="items-left flex flex-col space-x-2 md:items-center">
                    <div>Jak se mi dařila dnes modlitba?</div>
                    <RadioGroup name="prayer" className="flex flex-row" defaultValue={memberProgress?.prayer}>
                      <ProgressToggleGroupItem mood="GOOD" name="prayer" />
                      <ProgressToggleGroupItem mood="NEUTRAL" name="prayer" />
                      <ProgressToggleGroupItem mood="SAD" name="prayer" />
                    </RadioGroup>
                  </div>

                  <div className="items-left flex flex-col space-x-2 md:items-center">
                    <div>Jak bys ohodnotil den?</div>
                    <RadioGroup name="overallMood" className="flex flex-row" defaultValue={memberProgress?.overallMood}>
                      <ProgressToggleGroupItem mood="GOOD" name="overallMood" />
                      <ProgressToggleGroupItem mood="NEUTRAL" name="overallMood" />
                      <ProgressToggleGroupItem mood="SAD" name="overallMood" />
                    </RadioGroup>
                  </div>
                </div>
                <div className="col-span-6 grid w-full gap-1.5 text-left">
                  <Label htmlFor="note">Poznámka</Label>
                  <Textarea
                    placeholder="Co se dařilo, nálada, cokoliv co chceš sdílet s bratrstvem"
                    id="note"
                    name="note"
                    defaultValue={memberProgress?.note || ""}
                  />
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="mx-auto flex w-full max-w-2xl flex-col justify-normal gap-2 text-sm font-thin italic">
              * Nezapomeň, že svůj den sdílíš s celým bratrsvem (případně bratrstvy). Svůj záznam tak najdeš právě tam.
            </div>
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-2">
              <SubmitButton className="w-full">Uložit můj den</SubmitButton>
            </div>
            <DrawerClose>
              <Button type="button" variant={"outline"} size={"sm"} className="fixed top-4 right-4">
                <Cross2Icon />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
