"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface FeedbackNotificationProps {
  showDates: string[];
  children: React.ReactNode;
  localStorageKey: string;
  durationInDays?: number;
}

export const FeedbackNotification: React.FC<FeedbackNotificationProps> = ({
  showDates,
  children,
  localStorageKey,
  durationInDays = 14,
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const isInTimeRange = (date: Date, now: Date): boolean => {
    return now.getTime() - date.getTime() <= durationInDays * 24 * 60 * 60 * 1000;
  };

  const isDismissed = (showDate: Date, lastDismissed: Date | null, isLastShowDate: boolean): boolean => {
    if (!lastDismissed) return false;
    if (isLastShowDate) return showDate <= lastDismissed;
    return showDate <= lastDismissed;
  };

  const isLastShowDate = (date: string): boolean => {
    return date === showDates[showDates.length - 1];
  };

  const shouldShowNotification = (
    showDate: Date,
    now: Date,
    lastDismissed: Date | null,
    isLastShowDate: boolean,
  ): boolean => {
    if (now < showDate) return false;

    if (isLastShowDate) {
      return !isDismissed(showDate, lastDismissed, true);
    }

    return isInTimeRange(showDate, now) && !isDismissed(showDate, lastDismissed, false);
  };

  useEffect(() => {
    const now = new Date();
    const lastDismissedDate = localStorage.getItem(localStorageKey);
    const lastDismissed = lastDismissedDate ? new Date(lastDismissedDate) : null;

    // Find the current or next show date
    const currentOrNextShowDate = showDates.find((date) => {
      const showDate = new Date(date);
      const isLastDate = isLastShowDate(date);
      return shouldShowNotification(showDate, now, lastDismissed, isLastDate);
    });

    // If we found a show date but it's older than duration and was dismissed, don't show
    if (currentOrNextShowDate && lastDismissed) {
      const showDate = new Date(currentOrNextShowDate);
      const isShowDateOlderThanDuration = !isInTimeRange(showDate, now);
      const isDismissedOlderThanDuration = !isInTimeRange(lastDismissed, now);

      if (isShowDateOlderThanDuration && isDismissedOlderThanDuration) {
        setShowNotification(false);
        return;
      }
    }

    // If we found a show date but it's outside the time range, don't show
    if (currentOrNextShowDate && !isInTimeRange(new Date(currentOrNextShowDate), now)) {
      setShowNotification(false);
      return;
    }

    setShowNotification(!!currentOrNextShowDate);
  }, [showDates, durationInDays, localStorageKey]);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem(localStorageKey, new Date().toISOString());
  };

  if (!showNotification) return null;

  return (
    <div className="bg-primary/90 text-primary-foreground top-0 right-0 left-0 z-50 p-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="w-10"></div> {/* Spacer */}
        <div className="flex grow items-center justify-center">{children}</div>
        <button
          onClick={handleDismiss}
          className="plausible-event-name=feedback-notification-dismiss text-primary-foreground w-10 font-bold"
        >
          <Cross1Icon />
        </button>
      </div>
    </div>
  );
};
