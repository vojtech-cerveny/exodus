import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, getInitials, stringToColor } from "@/lib/utils";
import { Suspense } from "react";

// Separate Image component to handle loading state
function AvatarImageWithFallback({
  src,
  alt,
  color,
  initials,
}: {
  src: string;
  alt: string;
  color: string;
  initials: string;
}) {
  return (
    <Avatar>
      {src ? (
        <>
          <AvatarImage src={src} alt={alt} loading="eager" />
          <AvatarFallback className={cn(color)}>{initials}</AvatarFallback>
        </>
      ) : (
        <AvatarFallback className={cn(color)}>{initials}</AvatarFallback>
      )}
    </Avatar>
  );
}

export function AvatarWithFallBack({
  user,
  withTooltip = true,
}: {
  withTooltip?: boolean;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    brotherhoodId: string | null;
  };
}) {
  const color = `bg-[${stringToColor(user.id)}]` as const;
  const initials = getInitials(user.name || "??");

  const avatarContent = (
    <Suspense
      fallback={
        <Avatar>
          <AvatarFallback className={cn(color)}>{initials}</AvatarFallback>
        </Avatar>
      }
    >
      <AvatarImageWithFallback src={user.image || ""} alt={user.name || ""} color={color} initials={initials} />
    </Suspense>
  );

  if (!withTooltip) return avatarContent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{avatarContent}</TooltipTrigger>
        <TooltipContent>
          <p>{user.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
