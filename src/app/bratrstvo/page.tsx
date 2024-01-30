import SubmitButton from "@/components/submit-button";
import { H2, H3 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { createBrotherhoodAction } from "@/domain/brotherhood/brotherhood-action";
import { getBrotherhoodsByUserId } from "@/domain/brotherhood/brotherhood-service";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function BrotherhoodPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const brotherhoods = await getBrotherhoodsByUserId(session.user!.id);
  const createBrotherhoodByUser = createBrotherhoodAction.bind(null, session.user!.id);

  return (
    <div>
      <H2>Bratrstvo</H2>
      <ul className="pt-4">
        {brotherhoods.map((brotherhood) => (
          <li key={brotherhood.id}>
            <Link href={`/bratrstvo/${brotherhood.id}`} passHref>
              ● Bratrstvo <span className="font-semibold">{brotherhood.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <H3>Nové bratrstvo</H3>
      <form action={createBrotherhoodByUser} className="flex items-end gap-2">
        <div>
          <label htmlFor="name">Název</label>
          <Input type="text" id="name" name="name" />
        </div>
        <SubmitButton>Vytvořit</SubmitButton>
      </form>
    </div>
  );
}
