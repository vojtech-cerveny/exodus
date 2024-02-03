import SubmitButton from "@/components/submit-button";
import { H2, H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createBrotherhoodAction } from "@/domain/brotherhood/brotherhood-action";
import { getBrotherhoodsByUserId } from "@/domain/brotherhood/brotherhood-service";
import Link from "next/link";
import { auth } from "../../../auth";

export default async function BrotherhoodPage() {
  const session = await auth();
  if (!session) {
    // redirect("/api/auth/signin");
    return (
      <>
        <H2>Bratrstvo</H2>
        <p className="my-4">
          Po přihlášení se můžeš stát členem bratrstva a zapisovat si svoje úspěchy v dodržování Exodu. Ty pak jsou
          sdíleny s Tvým bratrstvem a Ty vidíš pokrok svých bratrů na jednom místě.
        </p>
      </>
    );
  }

  const brotherhoods = await getBrotherhoodsByUserId(session.user!.id);
  const createBrotherhoodByUser = createBrotherhoodAction.bind(null, session.user!.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <H2>Bratrstvo</H2>
        <Dialog>
          <DialogTrigger>
            <Button variant={"secondary"}>Vytvořit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vytvoření nového bratrstva</DialogTitle>
              <DialogDescription>
                <form action={createBrotherhoodByUser} className="flex items-end gap-2">
                  <div>
                    <label htmlFor="name">Název bratrstva</label>
                    <Input type="text" id="name" name="name" />
                  </div>
                  <SubmitButton>Vytvořit</SubmitButton>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {brotherhoods.length !== 0 ? (
        <ul className="pt-4">
          {brotherhoods.map((brotherhood) => (
            <li key={brotherhood.id}>
              <Link href={`/bratrstvo/${brotherhood.id}`} passHref>
                ● Bratrstvo <span className="font-semibold">{brotherhood.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-4">Nejste členem žádného bratrstva.</p>
      )}

      <H3>Nové bratrstvo</H3>
    </div>
  );
}
