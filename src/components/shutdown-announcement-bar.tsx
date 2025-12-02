"use client";

import { Cross1Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface ShutdownAnnouncementBarProps {
  onReadMoreClick: () => void;
}

export const ShutdownAnnouncementBar: React.FC<ShutdownAnnouncementBarProps> = ({ onReadMoreClick }) => {
  const [showNotification, setShowNotification] = useState(false);
  const localStorageKey = "shutdownAnnouncementDismissed";

  useEffect(() => {
    const dismissed = localStorage.getItem(localStorageKey);
    setShowNotification(!dismissed);
  }, []);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem(localStorageKey, new Date().toISOString());
  };

  if (!showNotification) return null;

  return (
    <div className="bg-destructive text-destructive-foreground relative flex w-full min-w-full items-center justify-between gap-4 border-b px-4 py-3 shadow-md sm:px-6 md:max-w-2xl lg:px-8">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-1 items-center justify-center gap-3 md:w-2xl">
          <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <p className="font-semibold">Důležité oznámení:</p>
            <p className="text-sm">Přechod na oficiální aplikaci Exodus90. Tato aplikace zanikne s novým rokem 2026.</p>
            <button onClick={onReadMoreClick} className="text-sm underline hover:no-underline sm:ml-2">
              Přečíst více
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="hover:bg-destructive-foreground/10 flex-shrink-0 rounded p-1 transition-colors"
        aria-label="Zavřít oznámení"
      >
        <Cross1Icon className="h-4 w-4" />
      </button>
    </div>
  );
};
