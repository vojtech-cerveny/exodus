import { BrotherhoodMembers } from "@/components/brotherhood/brotherhood-members";
import BrotherhoodSettings from "@/components/brotherhood/brotherhood-settings";
import BrotherhoodShareInvitation from "@/components/brotherhood/brotherhood-share-invitation";
import ProgressTable from "@/components/brotherhood/progress-table";
import { H2 } from "@/components/typography";
import { getBrotherhood } from "@/domain/brotherhood/brotherhood-service";
import { notFound } from "next/navigation";
import { auth } from "../../../../auth";

export default async function BrotherhoodDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  const brotherhood = await getBrotherhood(params.id);
  const isInBrotherhood = brotherhood?.members.some((member) => member.id === session?.user!.id);

  if (!brotherhood || isInBrotherhood === false) {
    return notFound();
  }

  return (
    <div>
      <H2>{brotherhood.name}</H2>
      <h2>{brotherhood.description}</h2>
      <div className="flex justify-between py-4">
        <BrotherhoodMembers members={brotherhood.members} />

        <div className="flex items-center justify-center gap-2">
          {session?.user!.id === brotherhood!.creator!.id && <BrotherhoodSettings brotherhoodId={brotherhood.id} />}

          <BrotherhoodShareInvitation brotherhoodId={brotherhood.id} />
          {/* <ProgressUpdateCard /> */}
        </div>
      </div>

      <ProgressTable brotherhoodId={brotherhood.id} />
    </div>
  );
}
