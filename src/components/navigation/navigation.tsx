"use client";
import { getEventStatus } from "@/app/utils/date";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import moment from "moment";
import "moment/locale/cs";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { CrownIcon, ExodusIcon } from "../icons/icons";

export default function Navigation() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const exodus = getEventStatus("EXODUS");
  const kralovskeLeto = getEventStatus("KRALOVSKE_LETO");

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
                    <p className="text-sm leading-tight text-muted-foreground">
                      Exodus 90 je devadesátidenní duchovní cvičení pro muže založené na třech pilířích: modlitbě,
                      askezi a bratrství. Všechny tři tyto pilíře jsou podstatnými aspekty křesťanského života.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              {exodus.isRunning ? (
                <>
                  <ListItem href="/exodus/today" title="Dnešní den">
                    Vždy zobrazuje aktuální text na den.
                  </ListItem>
                  <ListItem
                    href={"/exodus/ukony/" + Math.floor(exodus.currentDays / 7 + 1)}
                    title="Aktuální týdenní úkony"
                  >
                    Vždy zobrazuje aktuální úkony na týden.
                  </ListItem>
                  <ListItem href="/exodus/dny" title="Seznam dní">
                    Kolik toho máš za sebou a před sebou?
                  </ListItem>
                  <ListItem href="/exodus/ukony/" title="Týdenní úkony">
                    Seznam týdnů a úkony pro ně.
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem href="/exodus/dny" title="Seznam dní">
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
        <NavigationMenuItem>
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
        </NavigationMenuItem>
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
            {console.log("session2")}
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

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm  font-medium leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
