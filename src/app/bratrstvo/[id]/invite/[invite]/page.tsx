import { H1, Paragraph } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { acceptBrotherhoodInvitationAction } from "@/domain/brotherhood-invitation/brotherhood-invitation-action";
import { getBrotherhoodInvitation } from "@/domain/brotherhood-invitation/brotherhood-invitation-service";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";

export default async function BrotherhoodInvitePage({ params }: { params: { id: string; invite: string } }) {
  const session = await auth();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  const invitation = await getBrotherhoodInvitation(params.id, params.invite);

  //TODO: Improve error messages if invitation is not valid
  if (!invitation) {
    return <h1>Invalid invitation</h1>;
  }

  const brotherhood = invitation?.brotherhood;
  const handleAcceptingInvitation = acceptBrotherhoodInvitationAction.bind(null, {
    userId: session.user!.id,
    brotherhoodId: invitation?.brotherhoodId,
  });

  return (
    <div>
      <H1>Pozvánka do bratrsva</H1>
      <Paragraph>
        Pozvánka do bratrstva {brotherhood?.name} od {brotherhood?.creator?.name}
      </Paragraph>
      <div>
        <form action={handleAcceptingInvitation}>
          <Button>Přijmout pozvánku</Button>
        </form>
        <Button variant={"secondary"}>Odmítnout pozvánku</Button>
      </div>
    </div>
  );
}
