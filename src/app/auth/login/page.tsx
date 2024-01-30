import { SignIn } from "@/components/auth-components";
import LoginRegirect from "@/components/login-redirect";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { auth } from "../../../../auth";

// TODO: we need to update this page be super shiny
export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return <LoginRegirect />;
  }

  return (
    <>
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Přihlášení</DialogTitle>
            <DialogDescription className="flex">
              <img src={"/icons/login.svg"} alt="Logo" width={200} height={200} />
              <div className="flex h-full w-full items-center justify-center">
                <SignIn provider="google" withIcon text="Přihlaš se přes Google" />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
