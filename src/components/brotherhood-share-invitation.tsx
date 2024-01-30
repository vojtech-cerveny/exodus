import { Button } from "@/components/ui//button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  regenerateBrotherhoodInvitationAction,
  toggleActivityBrotherhoInvitationAction,
} from "@/domain/brotherhood-invitation/brotherhood-invitation-action";
import { getInvitationToken } from "@/domain/brotherhood-invitation/brotherhood-invitation-service";
import { Share1Icon } from "@radix-ui/react-icons";
import { CopyLink } from "./copy-link";
import SubmitButton from "./submit-button";
import { FormSwitch } from "./ui/form-switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default async function BrotherhoodShareInvitation({ brotherhoodId }: { brotherhoodId: string }) {
  const invitation = await getInvitationToken(brotherhoodId);
  const handleRegenerateLink = regenerateBrotherhoodInvitationAction.bind(null, brotherhoodId);
  const handleToggle = toggleActivityBrotherhoInvitationAction.bind(null, brotherhoodId);
  if (!invitation) {
    return null;
  }

  let link = process.env.HOST + "/bratrstvo/" + brotherhoodId + "/invite/" + invitation!.token;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pozvání do bratrstva</DialogTitle>
          <DialogDescription>Kdokoliv s tímto odkazem bude moct vstoupit do bratrstva.</DialogDescription>
        </DialogHeader>
        <CopyLink link={link} />
        <form action={handleToggle} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <FormSwitch defaultValue={invitation.active} label="asd" name="asd" onChange={handleToggle} />
          </div>
        </form>
        <Separator />
        <form action={handleRegenerateLink} className="flex flex-col gap-4">
          <SubmitButton>Přegenerovat link</SubmitButton>
          <Label>
            Tento krok zruší předchozí link a nahradí jej. To znamená, že pokud jsi vytvořil pozvánku už pro někoho, tak
            pak jeho pozvánka bude zrušená a budeš mu poslat novou.
          </Label>
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Zavřít
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
