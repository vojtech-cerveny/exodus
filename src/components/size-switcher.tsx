"use client";

import { FontSizeIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function SizeSwitcher() {
  const [fontSize, setFontSize] = useLocalStorage("fontSize", "16px");

  const changeFontSize = () => {
    switch (fontSize) {
      case "16px":
        setFontSize("20px");
        break;
      case "20px":
        setFontSize("24px");
        break;
      case "24px":
        setFontSize("16px");
        break;
      default:
        setFontSize("16px");
    }
  };

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" onClick={changeFontSize}>
            <FontSizeIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
            <span className="sr-only">Change font size</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
