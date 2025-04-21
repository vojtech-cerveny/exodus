"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { getEventStatus } from "@/app/(app)/utils/date";
import { cn } from "@/lib/utils";
import { Exercise, Version } from "@/payload-types";
import moment from "moment";
import "moment/locale/cs";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ExodusIcon } from "../icons/icons";

interface NavigationClientProps {
  versions: (Version & { exercise: Exercise })[];
  userSelections: Record<string, string>;
}

// Update props to include userSelections
export default function NavigationClient({ versions, userSelections }: NavigationClientProps) {
  const { data: session } = useSession();
  const { theme } = useTheme();

  const renderNavigationForVersion = (latestVersionData: Version & { exercise: Exercise }) => {
    // Type guard to ensure exercise is populated correctly
    if (typeof latestVersionData.exercise !== "object" || !("slug" in latestVersionData.exercise)) {
      console.error("Invalid exercise data in navigation:", latestVersionData);
      return null;
    }

    const exerciseSlug = latestVersionData.exercise.slug;
    const exerciseName = latestVersionData.exercise.name;

    // Get user's selected version from props (empty for unauthenticated users)
    const userSelectedVersion = userSelections[exerciseSlug];

    // Determine which version to use for links:
    // - Use user's selected version if they are authenticated and have a selection
    // - Fall back to the latest version otherwise (for unauthenticated users or no selection)
    const versionSlugForLinks = userSelectedVersion || latestVersionData.slug;

    if (!versionSlugForLinks) {
      console.warn(
        `No version slug determined for exercise: ${exerciseSlug}. User selection: ${userSelectedVersion}, Latest version: ${latestVersionData.slug}`,
      );
      // Don't render this menu item if no version can be determined
      return null;
    }

    // Use the latest version data (passed via props) to check status (isRunning, startDate, etc.)
    const status = getEventStatus(latestVersionData);

    return (
      <NavigationMenuItem key={exerciseSlug}>
        <NavigationMenuTrigger>{exerciseName}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-4">
              <NavigationMenuLink asChild>
                <Link
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none hover:bg-slate-300 hover:shadow-xs focus:shadow-md"
                  href={`/${exerciseSlug}/${versionSlugForLinks}`}
                >
                  <ExodusIcon size={48} color={theme === "dark" ? "#FFFFFF" : "#1C274C"} />
                  <div className="mt-2 mb-2 text-lg font-medium">{exerciseName}</div>
                  <p className="text-muted-foreground text-sm leading-tight">Zjisti víc o {exerciseName}!</p>
                </Link>
              </NavigationMenuLink>
            </li>

            {status.isRunning ? (
              <>
                <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/dnesni-texty`} title="Dnešní den">
                  Vždy zobrazuje aktuální text na den.
                </ListItem>
                <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/`} title="Seznam dní">
                  Kolik toho máš za sebou a před sebou?
                </ListItem>
                <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/pruvodce`} title="Průvodce">
                  Průvodce pro toto cvičení.
                </ListItem>
                {latestVersionData.slug === "2024" && (
                  <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/ukony/`} title="Týdenní úkony">
                    Seznam týdnů a úkony pro ně.
                  </ListItem>
                )}
                <ListItem>
                  Používaná verze: <span className="font-bold">{versionSlugForLinks}</span>
                  {!userSelectedVersion && <span className="text-muted-foreground text-xs"> (Výchozí)</span>}
                </ListItem>
              </>
            ) : (
              <>
                <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/`} title="Seznam dní">
                  Kolik toho máš za sebou a před sebou?
                </ListItem>
                <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/pruvodce`} title="Průvodce">
                  Průvodce pro toto cvičení.
                </ListItem>
                <ListItem>
                  Cvičení {exerciseName} momentálně neběží. Začíná {moment(latestVersionData.startDate).fromNow()} (
                  {moment(latestVersionData.startDate).format("LL")})
                </ListItem>
                <ListItem>
                  Používaná verze: <span className="font-bold">{versionSlugForLinks}</span>
                  {!userSelectedVersion && <span className="text-muted-foreground text-xs"> (Výchozí)</span>}
                </ListItem>
              </>
            )}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap items-center">
        {versions.map((latestVersionData) => renderNavigationForVersion(latestVersionData))}
        {/* Standard Links */}
        {/* <NavigationMenuItem>
          <Link href="/articles" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Průvodce</NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {session && (
          <>
            <NavigationMenuItem>
              <Link href="/bratrstvo" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Bratrstvo</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/bookmarks" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Záložky</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title?: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug font-medium">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
