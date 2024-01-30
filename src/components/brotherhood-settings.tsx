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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { removeUserFromBrotherhoodAction } from "@/domain/brotherhood/brotherhood-action";
import { getMembers, getUserByUserId } from "@/domain/brotherhood/brotherhood-service";
import { GearIcon, TrashIcon } from "@radix-ui/react-icons";
import { auth } from "../../auth";
import { AvatarWithFallBack } from "./avatar";
import SubmitButton from "./submit-button";

export default async function BrotherhoodSettings({ brotherhoodId }: { brotherhoodId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <GearIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Správa členů bratrstva</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Members brotherhoodId={brotherhoodId} />
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

async function Members({ brotherhoodId }: { brotherhoodId: string }) {
  const allMembers = await getMembers(brotherhoodId);

  return (
    <>
      {allMembers?.members.map((member, index) => (
        <MemberDeleteRow key={index} brotherhoodId={brotherhoodId} userId={member.id} />
      ))}
    </>
  );
}

async function MemberDeleteRow({ brotherhoodId, userId }: { brotherhoodId: string; userId: string }) {
  const user = await getUserByUserId(userId);
  const session = await auth();
  if (user?.id == session?.user!.id) {
    return;
  }
  const handleRemoveMember = removeUserFromBrotherhoodAction.bind(null, userId, brotherhoodId);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <AvatarWithFallBack user={user!} withTooltip={false} />
        {user?.name}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default">
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Jsi si jistý?</AlertDialogTitle>
            <AlertDialogDescription>
              Tato akce nelze vrátit. Opravdu chceš odstranit tohoto člena?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zpět</AlertDialogCancel>
            <form action={handleRemoveMember}>
              <AlertDialogAction>
                <SubmitButton>Odstranit</SubmitButton>
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
