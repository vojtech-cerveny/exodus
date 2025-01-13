import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@auth";

export function SignIn({
  provider,
  withIcon = false,
  text = "Přihlaš se",
  ...props
}: { provider?: string; withIcon?: boolean; text?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, {
          callbackUrl: "/",
          redirect: true,
        });
      }}
    >
      <Button variant="default" {...props}>
        {withIcon && <img src="/icons/google.svg" className="mr-2 h-4 w-4 invert dark:invert-0" alt="Google logo" />}
        {text}
      </Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Odhlásit se
      </Button>
    </form>
  );
}
