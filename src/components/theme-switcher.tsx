"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      // for PWA
      if (document.querySelector('meta[name="theme-color"]')) {
        document.querySelector('meta[name="theme-color"]')!.setAttribute("content", "#000"); // Light theme color
        document.querySelector('meta[name="background-color"]')!.setAttribute("content", "#fff"); // Light theme color
      }
    } else {
      setTheme("dark");
      // for PWA
      if (document.querySelector('meta[name="theme-color"]')) {
        document.querySelector('meta[name="theme-color"]')!.setAttribute("content", "#fff"); // Dark theme color
        document.querySelector('meta[name="background-color"]')!.setAttribute("content", "#18181b");
      }
    }
  };
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" onClick={changeTheme}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
