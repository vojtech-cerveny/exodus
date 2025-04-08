import { auth } from "@auth";
import { Suspense } from "react";
import { SignIn, SignOut } from "./auth-components";
import { AvatarWithFallBack } from "./avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Suspense
            fallback={
              <AvatarWithFallBack
                user={{
                  id: session.user.id,
                  name: session.user.name ?? null,
                  email: session.user.email ?? null,
                  image: session.user.image ?? null,
                  brotherhoodId: null,
                  emailVerified: null,
                }}
                withTooltip={false}
              />
            }
          >
            <AvatarWithFallBack
              user={{
                id: session.user.id,
                name: session.user.name ?? null,
                email: session.user.email ?? null,
                image: session.user.image ?? null,
                brotherhoodId: null,
                emailVerified: null,
              }}
              withTooltip={false}
            />
          </Suspense>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="leading-none">{session.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
