import SubmitButton from "@/components/submit-button";
import { H2, H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createBrotherhoodAction, joinBrotherhoodAction } from "@/domain/brotherhood/brotherhood-action";
import { getBrotherhoodsByUserId, getOpenBrotherhoods } from "@/domain/brotherhood/brotherhood-service";
import { auth } from "@auth";
import Link from "next/link";

export default async function BrotherhoodPage() {
  const session = await auth();

  if (!session) {
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
  const openBrotherhoods = await getOpenBrotherhoods(session.user!.id);
  console.log(openBrotherhoods);
  const createBrotherhoodByUser = createBrotherhoodAction.bind(null, session.user!.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <H2>Bratrstvo</H2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Vytvořit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vytvoření nového bratrstva</DialogTitle>
              <DialogDescription>
                <form action={createBrotherhoodByUser} className="flex flex-col gap-4">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="name">Název bratrstva</Label>
                    <Input type="text" id="name" name="name" required />
                  </div>

                  <div className="grid w-full gap-2">
                    <Label htmlFor="description">Popis bratrstva</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Popište účel a cíle vašeho bratrstva..."
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility">Veřejné bratrstvo</Label>
                    <Switch id="visibility" name="visibility" />
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Veřejné bratrstvo bude viditelné pro ostatní uživatele a budou se moci připojit bez pozvánky. Pro
                    veřejné bratrstvo je vyžadován popis.
                  </div>

                  <SubmitButton>Vytvořit</SubmitButton>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <>
        <div className="mt-6">
          <H3>Moje bratrstva</H3>
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
        </div>

        <div className="mt-8">
          <H3>Otevřená bratrstva</H3>
          <div className="grid gap-4 pt-4">
            {openBrotherhoods.length === 0 && (
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Žádná veřejná bratrstva</CardTitle>
                  <CardDescription>Momentálně nejsou k dispozici žádná veřejná bratrstva.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger>
                      <Button>Vytvořit nové bratrstvo</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vytvoření nového bratrstva</DialogTitle>
                        <DialogDescription>
                          <form action={createBrotherhoodByUser} className="flex flex-col gap-4">
                            <div className="grid w-full gap-2">
                              <Label htmlFor="name">Název bratrstva</Label>
                              <Input type="text" id="name" name="name" required />
                            </div>

                            <div className="grid w-full gap-2">
                              <Label htmlFor="description">Popis bratrstva</Label>
                              <Textarea
                                id="description"
                                name="description"
                                placeholder="Popište účel a cíle vašeho bratrstva..."
                              />
                            </div>

                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="visibility">Veřejné bratrstvo</Label>
                              <Switch id="visibility" name="visibility" />
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Veřejné bratrstvo bude viditelné pro ostatní uživatele a budou se moci připojit bez
                              pozvánky. Pro veřejné bratrstvo je vyžadován popis.
                            </p>

                            <SubmitButton>Vytvořit</SubmitButton>
                          </form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
            {openBrotherhoods
              .filter((b) => !brotherhoods.some((myB) => myB.id === b.id))
              .map((brotherhood) => (
                <Card key={brotherhood.id}>
                  <CardHeader>
                    <CardTitle>{brotherhood.name}</CardTitle>
                    <CardDescription>Vytvořil: {brotherhood.creator?.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{brotherhood.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-sm">Počet členů: {brotherhood.members.length}</p>
                      <form
                        action={async () => {
                          "use server";
                          await joinBrotherhoodAction(session!.user!.id, brotherhood.id);
                        }}
                      >
                        <SubmitButton>Připojit se</SubmitButton>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </>
    </div>
  );
}
