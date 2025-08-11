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
import "moment/locale/sk";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ExodusIcon } from "../icons/icons";
import { useLanguage } from "../language-provider";

interface NavigationClientProps {
  versions: (Version & { exercise: Exercise })[];
  userSelections: Record<string, string>;
}

// Update props to include userSelections
export default function NavigationClient({ versions, userSelections }: NavigationClientProps) {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Filter versions by language preference with fallback to Czech
  const getPreferredVersions = (exerciseSlug: string) => {
    const exerciseVersions = versions.filter(
      (v) => typeof v.exercise === "object" && "slug" in v.exercise && v.exercise.slug === exerciseSlug,
    );

    // First try to find versions in the selected language
    let preferredVersions = exerciseVersions.filter((v) => v.language === language);

    // If no versions in selected language, fall back to Czech
    if (preferredVersions.length === 0) {
      preferredVersions = exerciseVersions.filter((v) => v.language === "czk");
    }

    // If still no versions, use all available versions
    if (preferredVersions.length === 0) {
      preferredVersions = exerciseVersions;
    }

    return preferredVersions;
  };

  const renderNavigationForVersion = (latestVersionData: Version & { exercise: Exercise }) => {
    // Type guard to ensure exercise is populated correctly
    if (typeof latestVersionData.exercise !== "object" || !("slug" in latestVersionData.exercise)) {
      console.error("Invalid exercise data in navigation:", latestVersionData);
      return null;
    }

    const exerciseSlug = latestVersionData.exercise.slug;
    const exerciseName = latestVersionData.exercise.name;

    // Get preferred versions for this exercise based on language
    const preferredVersions = getPreferredVersions(exerciseSlug);

    if (preferredVersions.length === 0) {
      return null;
    }

    // Get the latest preferred version
    const latestPreferredVersion = preferredVersions.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )[0];

    // Get user's selected version from props (empty for unauthenticated users)
    const userSelectedVersion = userSelections[exerciseSlug];

    // Determine which version to use for links:
    // - Use user's selected version if they are authenticated and have a selection
    // - Fall back to the latest preferred version otherwise
    const versionSlugForLinks = userSelectedVersion || latestPreferredVersion.slug;

    if (!versionSlugForLinks) {
      console.warn(
        `No version slug determined for exercise: ${exerciseSlug}. User selection: ${userSelectedVersion}, Latest preferred version: ${latestPreferredVersion.slug}`,
      );
      return null;
    }

    // Find the actual version being used for links to get its language
    const actualVersion = versions.find((v) => v.slug === versionSlugForLinks);
    const displayLanguage = actualVersion?.language || latestPreferredVersion.language;

    // Use the latest preferred version data to check status
    const status = getEventStatus(latestPreferredVersion);

    return (
      <NavigationMenuItem key={exerciseSlug}>
        <NavigationMenuTrigger>{exerciseName}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-4">
              <NavigationMenuLink asChild>
                <Link
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none hover:bg-slate-300 hover:shadow-xs focus:shadow-md"
                  href={`/${exerciseSlug}`}
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
                {/* {latestPreferredVersion.slug === "2024" && (
                  <ListItem href={`/${exerciseSlug}/${versionSlugForLinks}/ukony/`} title="Týdenní úkony">
                    Seznam týdnů a úkony pro ně.
                  </ListItem>
                )} */}
                <ListItem>
                  Používaná verze: <span className="font-bold">{versionSlugForLinks}</span>
                  {!userSelectedVersion && <span className="text-muted-foreground text-xs"> (Výchozí)</span>}
                  <br />
                  <span className="text-muted-foreground text-xs">
                    Jazyk: {displayLanguage === "svk" ? "Slovenčina" : "Čeština"}
                  </span>
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
                  Cvičení {exerciseName} momentálně neběží. Začíná {moment(latestPreferredVersion.startDate).fromNow()}{" "}
                  ({moment(latestPreferredVersion.startDate).format("LL")})
                </ListItem>
                <ListItem>
                  Používaná verze: <span className="font-bold">{versionSlugForLinks}</span>
                  {!userSelectedVersion && <span className="text-muted-foreground text-xs"> (Výchozí)</span>}
                  <br />
                  <span className="text-muted-foreground text-xs">
                    Jazyk: {displayLanguage === "svk" ? "Slovenčina" : "Čeština"}
                  </span>
                </ListItem>
              </>
            )}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  // Get unique exercises and their preferred versions
  const exerciseSlugs = Array.from(
    new Set(
      versions
        .map((v) => (typeof v.exercise === "object" && "slug" in v.exercise ? v.exercise.slug : null))
        .filter(Boolean),
    ),
  );

  const exercisesWithPreferredVersions = exerciseSlugs
    .map((slug) => {
      const preferredVersions = getPreferredVersions(slug!);
      if (preferredVersions.length === 0) return null;

      const latestPreferredVersion = preferredVersions.sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )[0];

      return {
        ...latestPreferredVersion,
        exercise: latestPreferredVersion.exercise as Exercise,
      };
    })
    .filter(Boolean) as (Version & { exercise: Exercise })[];

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap items-center">
        {exercisesWithPreferredVersions.map((latestVersionData) => renderNavigationForVersion(latestVersionData))}
        {/* Standard Links */}
        <NavigationMenuItem>
          <NavigationMenuLink href="/exercises" className={navigationMenuTriggerStyle()}>
            Další cvičení
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/articles" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Průvodce</NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {session && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink href="/bratrstvo" className={navigationMenuTriggerStyle()}>
                Bratrstvo
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/bookmarks" className={navigationMenuTriggerStyle()}>
                Záložky
              </NavigationMenuLink>
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
