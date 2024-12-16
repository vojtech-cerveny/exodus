import { constants } from "../constants";

export function countDaysFromJan1PlusOne() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const differenceInMs = Number(now) - Number(startOfYear);
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays + 1;
}

export function countDaysFromDate(dateString: string) {
  const date = new Date();
  const startOfYear = new Date(dateString);
  const differenceInMs = Number(date) - Number(startOfYear);
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays + 1;
}

export function getEventStatus(event: "EXODUS" | "KRALOVSKE_LETO") {
  const now = new Date();
  const currentYear = now.getFullYear();
  const eventConfig = constants[event];

  // Helper function to add days to a date
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Helper function to calculate the difference in days between two dates
  const diffInDays = (date1: Date, date2: Date): number => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Parse event start dates to get Date objects for the current year
  const dates = eventConfig.START_DATE.map((dateStr) => {
    const [month, day] = dateStr.split("-").map(Number);
    return new Date(currentYear, month - 1, day); // month is 0-based in JS Date
  });

  // Check if the event is currently running
  for (let date of dates) {
    const endDate = addDays(date, eventConfig.DURATION);
    if (now >= date && now <= endDate) {
      return {
        isRunning: true,
        startDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
        currentDays: diffInDays(date, now),
      };
    }
  }

  // Find the next start date that is in the future
  const nextDate = dates.find((date) => date > now);

  // If no future date is found, the next date is in the next year
  if (!nextDate) {
    const [month, day] = eventConfig.START_DATE[0].split("-").map(Number);
    const nextYearDate = new Date(currentYear + 1, month - 1, day);
    return {
      isRunning: false,
      startDate: `${nextYearDate.getFullYear()}-${String(nextYearDate.getMonth() + 1).padStart(2, "0")}-${String(nextYearDate.getDate()).padStart(2, "0")}`,
      currentDays: 0,
    };
  }

  // Return the next start date in YYYY-MM-DD format
  return {
    isRunning: false,
    startDate: `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`,
    currentDays: 0,
  };
}
