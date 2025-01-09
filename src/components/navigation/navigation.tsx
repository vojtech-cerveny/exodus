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
  const [version] = useLocalStorage("exodus-version", "2025");
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
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none hover:bg-slate-300 hover:shadow-sm focus:shadow-md"
                    href="/exodus"
                  >
                    <ExodusIcon size={48} color={theme === "dark" ? "#FFFFFF" : "#1C274C"} />
                    <div className="text-lg mb-2 mt-2 font-medium">Exodus 90</div>
                    <p className="text-sm leading-tight text-muted-foreground">Zjisti víc o Exodu 90!</p>
                  </Link>
                </NavigationMenuLink>
              </li>

              {exodus.isRunning ? (
                <>
                  <ListItem href={"/exodus/" + version + "/today"} title="Dnešní den">
                    Vždy zobrazuje aktuální text na den.
                  </ListItem>
                  <ListItem
                    href={"/exodus/" + version + "/ukony/" + Math.floor(exodus.currentDays / 7 + 1)}
                    title="Aktuální týdenní úkony"
                  >
                    Vždy zobrazuje aktuální úkony na týden.
                  </ListItem>
                  <ListItem href={"/exodus/" + version + "/"} title="Seznam dní">
                    Kolik toho máš za sebou a před sebou?
                  </ListItem>
                  <ListItem href={"/exodus/" + version + "/ukony/"} title="Týdenní úkony">
                    Seznam týdnů a úkony pro ně.
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem href={"/exodus/" + version + "/"} title="Seznam dní">
                    Kolik toho máš za sebou a před sebou?
                  </ListItem>
                  <ListItem>
                    Momentálně Exodus90 neběží. Zde uvidíš víc {moment(exodus.startDate).fromNow()} (
                    {moment(exodus.startDate).format("LL")})
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
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none hover:bg-slate-300 hover:shadow-sm focus:shadow-md"
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
                  <ListItem href="/kralovske-leto/today" title="Dnešní den">
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
          <Link href="/tydenni-setkani" legacyBehavior passHref>
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
            {/* <NavigationMenuItem>
              <Link href="/bookmarks" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Záložky</NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
          </>
        )}
        {exodus.isRunning && (
          <NavigationMenuItem>
            <Link href={`/exodus/${version}/today`} legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary/10`}>
                Dnešní texty
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm font-medium leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
