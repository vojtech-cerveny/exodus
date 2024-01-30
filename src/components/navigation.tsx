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
import Link from "next/link";

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dny</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Link href="/days" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Seznam dní</NavigationMenuLink>
            </Link>
            <Link href="/days/today" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dnešní den</NavigationMenuLink>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/articles" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Články</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/bratrstvo" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Bratrstvo</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
