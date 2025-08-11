"use client";

import moment from "moment";
import "moment/locale/cs";
import "moment/locale/sk";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "czk" | "svk";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("czk");

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language;

    if (savedLanguage && (savedLanguage === "czk" || savedLanguage === "svk")) {
      setLanguageState(savedLanguage);
      // Set moment.js locale
      if (savedLanguage === "svk") {
        moment.locale("sk");
      } else {
        moment.locale("cs");
      }
    } else {
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);

    // Update moment.js locale
    if (lang === "svk") {
      moment.locale("sk");
    } else {
      moment.locale("cs");
    }
  };

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
