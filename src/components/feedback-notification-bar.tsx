"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface FeedbackNotificationProps {
  showDates: string[];
  children: React.ReactNode;
  localStorageKey: string;
}

export const FeedbackNotification: React.FC<FeedbackNotificationProps> = ({ showDates, children, localStorageKey }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const now = new Date();
    const lastDismissedDate = localStorage.getItem(localStorageKey);
    const lastDismissed = lastDismissedDate ? new Date(lastDismissedDate) : null;

    // Find the current or next show date
    const currentOrNextShowDate = showDates.find((date) => {
      const showDate = new Date(date);
      return now >= showDate && (!lastDismissed || showDate > lastDismissed);
    });

    if (currentOrNextShowDate) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [showDates]);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem(localStorageKey, new Date().toISOString());
  };

  if (!showNotification) return null;

  return (
    <div className="left-0 right-0 top-0 z-50 bg-primary/90 p-4 text-primary-foreground shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="w-10"></div> {/* Spacer */}
        <div className="flex flex-grow items-center justify-center">{children}</div>
        <button
          onClick={handleDismiss}
          className="plausible-event-name=feedback-notification-dismiss w-10 font-bold text-primary-foreground"
        >
          <Cross1Icon />
        </button>
      </div>
    </div>
  );
};
