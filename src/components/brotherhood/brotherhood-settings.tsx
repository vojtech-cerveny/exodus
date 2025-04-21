import { Button } from "@/components/ui//button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { getBrotherhood, getMembers, getUserByUserId } from "@/domain/brotherhood/brotherhood-service";
import { auth } from "@auth";
import { GearIcon, TrashIcon } from "@radix-ui/react-icons";
import { AvatarWithFallBack } from "../avatar";
import SubmitButton from "../submit-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BrotherhoodSettingsForm } from "./brotherhood-settings-form";

export default async function BrotherhoodSettings({ brotherhoodId }: { brotherhoodId: string }) {
  const brotherhood = await getBrotherhood(brotherhoodId);
  const session = await auth();

  if (!brotherhood || brotherhood.createdBy !== session?.user?.id) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <GearIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-muted flex h-fit max-h-[90vh] min-h-[600px] flex-col">
        <DialogHeader>
          <DialogTitle>Nastavení bratrstva</DialogTitle>
          <DialogDescription>Upravte nastavení bratrstva {brotherhood.name}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 flex-col gap-4">
          <Tabs defaultValue="general" className="flex flex-1 flex-col">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="general">Obecné</TabsTrigger>
              <TabsTrigger value="members">Členové</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="general" className="mt-0 h-full">
                <BrotherhoodSettingsForm
                  brotherhoodId={brotherhoodId}
                  userId={session.user.id}
                  initialData={{
                    description: brotherhood.description,
                    visibility: brotherhood.visibility,
                  }}
                />
              </TabsContent>

              <TabsContent value="members" className="mt-0 h-full">
                <Members brotherhoodId={brotherhoodId} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

async function Members({ brotherhoodId }: { brotherhoodId: string }) {
  const allMembers = await getMembers(brotherhoodId);

  if (allMembers?.members.length == 1 || allMembers == null) {
    return (
      <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center">
        <p>Zatím zde nejsou žádní členové</p>
        <p className="text-sm">Pozvěte členy do vašeho bratrstva</p>
      </div>
    );
  }

  return (
    <>
      {allMembers.members.map((member, index) => (
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
