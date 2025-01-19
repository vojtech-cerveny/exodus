import { H2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { acceptBrotherhoodInvitationAction } from '@/domain/brotherhood-invitation/brotherhood-invitation-action';
import { getBrotherhoodInvitation } from '@/domain/brotherhood-invitation/brotherhood-invitation-service';
import { auth } from '@auth';
import { redirect } from 'next/navigation';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default async function BrotherhoodInvitePage(props: { params: Promise<{ id: string; invite: string }> }) {
  const params = await props.params;
  const session = await auth();

  if (!session) {
    return redirect('/api/auth/signin');
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
      {/* <H1>Pozvánka do bratrsva</H1> */}

      <Card>
        <CardHeader>
          <CardTitle>
            <H2>Pozvánka do bratrstva</H2>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Pozvánka do bratrstva «{brotherhood?.name}» od {brotherhood?.creator?.name}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4">
          <div className="flex justify-end gap-2 p-4">
            <Button variant={'secondary'}>Odmítnout pozvánku</Button>
            <form action={handleAcceptingInvitation}>
              <Button>Přijmout pozvánku</Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
