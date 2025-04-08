"use client";
import { getEventStatus } from "@/app/(app)/utils/date";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Version } from "@/payload-types";
import moment from "moment";
import "moment/locale/cs";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ExodusIcon } from "../icons/icons";

export default function Navigation() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const exodus = getEventStatus("EXODUS");
  const kralovskeLeto = getEventStatus("KRALOVSKE_LETO");
  const [version] = useLocalStorage<Version | null>("exodus-version", null);

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Exodus90</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none hover:bg-slate-300 hover:shadow-xs focus:shadow-md"
                    href="/exodus"
                  >
                    <ExodusIcon size={48} color={theme === "dark" ? "#FFFFFF" : "#1C274C"} />
                    <div className="mt-2 mb-2 text-lg font-medium">Exodus 90</div>
                    <p className="text-muted-foreground text-sm leading-tight">Zjisti víc o Exodu 90!</p>
                  </Link>
                </NavigationMenuLink>
              </li>

              {exodus.isRunning ? (
                <>
                  <ListItem href={"/exodus/" + version?.slug + "/dnesni-texty"} title="Dnešní den">
                    Vždy zobrazuje aktuální text na den.
                  </ListItem>
                  {version?.slug === "2024" && (
                    <ListItem
                      href={"/exodus/" + version?.slug + "/ukony/" + Math.floor(exodus.currentDays / 7 + 1)}
                      title="Aktuální týdenní úkony"
                    >
                      Vždy zobrazuje aktuální úkony na týden.
                    </ListItem>
                  )}

                  <ListItem href={"/exodus/" + version?.slug + "/"} title="Seznam dní">
                    Kolik toho máš za sebou a před sebou?
                  </ListItem>

                  {version?.slug === "2024" && (
                    <ListItem href={"/exodus/" + version?.slug + "/ukony/"} title="Týdenní úkony">
                      Seznam týdnů a úkony pro ně.
                    </ListItem>
                  )}
                  <ListItem>
                    Momentálně používáš verzi <span className="font-bold">{version?.displayName}</span>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem href={"/exodus/" + version?.slug + "/"} title="Seznam dní">
                    Kolik toho máš za sebou a před sebou?
                  </ListItem>
                  <ListItem>
                    Momentálně Exodus90 neběží. Zde uvidíš víc {moment(exodus.startDate).fromNow()} (
                    {moment(exodus.startDate).format("LL")})
                  </ListItem>
                  <ListItem>
                    Momentálně používáš verzi <span className="font-bold">{version?.displayName}</span>
                  </ListItem>
                </>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Královské léto</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden hover:bg-slate-300 hover:shadow-xs focus:shadow-md"
                    href="/kralovske-leto"
                  >
                    <CrownIcon size={48} color={theme === "dark" ? "#FFCB11" : "#1C274C"} />
                    <div className="text-lg mb-2 mt-2 font-medium">Královské léto</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      V duchovním životě je snadné polevit a zpohodlnět - zejména v letních měsících. Proto je zde
                      Královské léto, které je duchovní cvičení, které vám pomůže získat kontrolu nad svým životem.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {kralovskeLeto.isRunning ? (
                <>
                  <ListItem href="/kralovske-leto/dnesni-texty" title="Dnešní den">
                    Vždy zobrazuje aktuální text na den.
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem>
                    Momentálně Královské léto neběží. Zde uvidíš víc od {moment(kralovskeLeto.startDate).fromNow()} (
                    {moment(kralovskeLeto.startDate).format("LL")})
                  </ListItem>
                </>
              )}
              <ListItem href="/kralovske-leto/dny" title="Seznam dní">
                Kolik toho máš za sebou a před sebou?
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link href="/articles" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Průvodce</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={version?.slug === "2024" ? "/tydenni-setkani" : "/exodus/" + version?.slug + "/tydenni-setkani"}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Týdenní setkání</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
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
        {exodus.isRunning && (
          <NavigationMenuItem>
            <Link href={`/exodus/${version?.slug}/dnesni-texty`} legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary/10`}>
                Dnešní text
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
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
