import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getInitials, stringToColor } from "@/lib/utils";
import { Suspense } from "react";

// Separate Image component to handle loading state
function AvatarImageWithFallback({
  src,
  alt,
  backgroundColor,
  initials,
}: {
  src: string;
  alt: string;
  backgroundColor: string;
  initials: string;
}) {
  return (
    <Avatar>
      {src ? (
        <>
          <AvatarImage src={src} alt={alt} loading="eager" />
          <AvatarFallback style={{ backgroundColor }}>{initials}</AvatarFallback>
        </>
      ) : (
        <AvatarFallback style={{ backgroundColor }}>{initials}</AvatarFallback>
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
  const backgroundColor = stringToColor(user.id);
  const initials = getInitials(user.name || "??");

  const avatarContent = (
    <Suspense
      fallback={
        <Avatar>
          <AvatarFallback style={{ backgroundColor }}>{initials}</AvatarFallback>
        </Avatar>
      }
    >
      <AvatarImageWithFallback
        src={user.image || ""}
        alt={user.name || ""}
        backgroundColor={backgroundColor}
        initials={initials}
      />
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
