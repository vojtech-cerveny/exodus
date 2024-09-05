"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FeedbackNotificationProps {
  showDates: string[];
  googleFormUrl: string;
}

export function FeedbackNotification({ showDates, googleFormUrl }: FeedbackNotificationProps) {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const lastDismissedDate = localStorage.getItem("feedbackNotificationDismissed");
      const lastShownDateIndex = parseInt(localStorage.getItem("feedbackNotificationLastShownIndex") || "-1", 10);

      for (let i = lastShownDateIndex + 1; i < showDates.length; i++) {
        const showDate = new Date(showDates[i]);
        if (now >= showDate && (!lastDismissedDate || new Date(lastDismissedDate) < showDate)) {
          setShowNotification(true);
          localStorage.setItem("feedbackNotificationLastShownIndex", i.toString());
          break;
        }
      }
    };

    checkDate();
  }, [showDates]);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem("feedbackNotificationDismissed", new Date().toISOString());
  };

  if (!showNotification) return null;

  return (
    <div className="left-0 right-0 top-0 z-50 bg-primary/90 p-4 text-primary-foreground shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="w-10"></div> {/* Spacer */}
        <div className="flex flex-grow items-center justify-center">
          <p className="mr-2">Dej nám zpětnou vazbu</p>
          <Link href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="underline">
            vyplněním krátkého dotazníku.
          </Link>
        </div>
        <button onClick={handleDismiss} className="w-10 font-bold text-primary-foreground">
          <Cross1Icon />
        </button>
      </div>
    </div>
  );
}
