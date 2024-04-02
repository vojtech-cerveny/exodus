"use client";
import { countDaysFromJan1PlusOne } from "@/app/utils/date";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dny</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Link href="/days" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Seznam dní</NavigationMenuLink>
            </Link>
            <Link href="/days/today" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dnešní den</NavigationMenuLink>
            </Link>
            <Separator />
            <Link href={"/ukony/"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Seznam týdnů</NavigationMenuLink>
            </Link>
            {/* TODO: add tests for this - if this works properly or not */}
            <Link href={"/ukony/" + Math.floor(countDaysFromJan1PlusOne() / 7 + 1)} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Týdenní úkony</NavigationMenuLink>
            </Link>
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
