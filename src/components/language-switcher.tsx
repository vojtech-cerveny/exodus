"use client";

import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "czk", label: "Čeština", flag: "🇨🇿" },
    { code: "svk", label: "Slovenčina", flag: "🇸🇰" },
  ] as const;

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <span className="text-lg">{currentLanguage?.flag || "🌐"}</span>
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 ${language === lang.code ? "bg-accent" : ""}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
            {language === lang.code && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
