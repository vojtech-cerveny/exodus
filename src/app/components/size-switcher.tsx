"use client";

import * as React from "react";
import { FontSizeIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useLocalStorage from "../hooks/useLocalStorage";

export function SizeSwitcher() {
  const [fontSize, setFontSize] = useLocalStorage("fontSize", "16px");

  const changeTheme = () => {
    switch (fontSize) {
      case "16px":
        setFontSize("20px");
        break;
      case "20px":
          setFontSize("24px");
          break;
      case "24px":
        setFontSize("32px");
        break;
      case "32px":
        setFontSize("16px");
        break;
      default:
        setFontSize("16px");
    }
    document.documentElement.style.fontSize = fontSize;
  };
  document.documentElement.style.fontSize = fontSize;
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" onClick={changeTheme}>
            <FontSizeIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
