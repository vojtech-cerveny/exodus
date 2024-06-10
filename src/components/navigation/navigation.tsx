"use client";
import { countDaysFromDate, countDaysFromJan1PlusOne } from "@/app/utils/date";
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
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import crownIcon from "../icons/crown.svg";
import exodusIcon from "../icons/exodus.svg";

export default function Navigation() {
  const { data: session } = useSession();
  console.log("navigation session");
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Exodus</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/exodus"
                  >
                    <Image src={exodusIcon} alt="Edoxus icon" width={32} height={32} />
                    <div className="text-lg mb-2 mt-2 font-medium">Exodus 90</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Exodus90 je 90 denní duchovní cvičení, které vám pomůže získat kontrolu nad svým životem. Toto
                      cvičení zahrnuje modlitbu, půst, cvičení a studium.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/exodus/dny" title="Seznam dní">
                Kolik toho máš za sebou a před sebou?
              </ListItem>

              {/* TODO: add tests for this - if this works properly or not */}
              {countDaysFromJan1PlusOne() <= 91 ? (
                <>
                  <ListItem href="/exodus/today" title="Dnešní den">
                    Vždy zobrazuje aktuální text na den.
                  </ListItem>
                  <ListItem href="/exodus/ukony/" title="Týdenní úkony">
                    Seznam týdnů a úkony pro ně.
                  </ListItem>
                  <ListItem
                    href={"/exodus/ukony/" + Math.floor(countDaysFromJan1PlusOne() / 7 + 1)}
                    title="Aktuální úkony"
                  >
                    Vždy zobrazuje aktuální úkony na týden.
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem>Momentálně Exodus90 neběží. Zde uvidíš víc od 1.1.2024</ListItem>
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
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/kralovske-leto"
                  >
                    <Image src={crownIcon} alt="Kralovske leto" width={32} height={32} />
                    <div className="text-lg mb-2 mt-2 font-medium">Královské léto</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      V duchovním životě je snadné polevit a zpohodlnět - zejména v letních měsících. Proto je zde
                      Královské léto, které je duchovní cvičení, které vám pomůže získat kontrolu nad svým životem.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {/* TODO: add tests for this - if this works properly or not */}
              {countDaysFromDate("2024-06-09") <= 91 ? (
                <>
                  <ListItem href="/kralovske-leto/today" title="Dnešní den">
                    Vždy zobrazuje aktuální text na den.
                  </ListItem>
                </>
              ) : (
                <>
                  {" "}
                  <ListItem>Momentálně Exodus90 neběží. Zde uvidíš víc od 1.1.2024</ListItem>
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
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Články</NavigationMenuLink>
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
