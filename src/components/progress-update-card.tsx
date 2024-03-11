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

import { ProgressToggleGroupItem } from "./progress-toggle-group-item";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import createMemberProgressAction from "@/domain/brotherhood-progress/brotherhood-progress-action";
import { getBrotherhoodsByUserId } from "@/domain/brotherhood/brotherhood-service";
import { auth } from "../../auth";
import SubmitButton from "./submit-button";
import { Button } from "./ui/button";
import { RadioGroup } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";

export default async function ProgressUpdateCard() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const isUserInBrotherhood = await getBrotherhoodsByUserId(session.user!.id);

  if (isUserInBrotherhood.length === 0) {
    return null;
  }

  return (
    <Drawer>
      <DrawerTrigger className="relative right-0">
        <Button className="">Můj den</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form action={createMemberProgressAction}>
          <DrawerHeader>
            <DrawerTitle className="flex justify-center pb-4">Zadej update Tvého dne</DrawerTitle>
            <DrawerDescription>
              <div className="mx-auto grid max-w-2xl grid-cols-1 items-center justify-center gap-4 md:grid-cols-6">
                <div className="items-left col-span-2 flex flex-col justify-center space-y-4 pl-0 md:pl-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="shower" name="shower" />
                    <Label className=" font-medium leading-none" htmlFor="shower">
                      Sprcha
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exercise" name="exercise" />
                    <Label className=" font-medium leading-none" htmlFor="exercise">
                      Cvičení
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asceticism" name="asceticism" />
                    <Label className=" font-medium leading-none" htmlFor="asceticism">
                      Askeze
                    </Label>
                  </div>
                </div>
                <div className="items-left flex flex-col md:col-span-4 md:items-center">
                  <div className="items-left flex flex-col space-x-2 md:items-center">
                    <p>Jak se mi dařila dnes modlitba?</p>
                    <RadioGroup name="prayer" className="flex flex-row">
                      <ProgressToggleGroupItem mood="GOOD" name="prayer" />
                      <ProgressToggleGroupItem mood="NEUTRAL" name="prayer" />
                      <ProgressToggleGroupItem mood="SAD" name="prayer" />
                    </RadioGroup>
                  </div>

                  <div className="items-left flex flex-col space-x-2 md:items-center">
                    <p>Jak bys ohodnotil den?</p>
                    <RadioGroup name="overallMood" className="flex flex-row">
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
                  />
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-2">
              <SubmitButton className="w-full">Uložit můj den</SubmitButton>
              <Button type="reset" className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
