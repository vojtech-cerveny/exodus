import { SignIn } from "@/components/auth-components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="m-28 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Přihlášení</CardTitle>
          <CardDescription>Přihlaste se pomocí svého Google účtu</CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn provider="google" withIcon className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
