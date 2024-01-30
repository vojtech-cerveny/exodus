import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, getInitials, stringToColor } from "@/lib/utils";

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

  withTooltip && (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar>
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className={cn(color)}>{getInitials(user.name || "??")}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{user.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Avatar>
      <AvatarImage src={user.image || ""} alt={user.name || ""} />
      <AvatarFallback className={cn(color)}>{getInitials(user.name || "??")}</AvatarFallback>
    </Avatar>
  );
}
