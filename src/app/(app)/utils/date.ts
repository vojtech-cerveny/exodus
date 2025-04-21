import { Version } from "@/payload-types";

export function countDaysFromDate(dateString: string) {
  const date = new Date();
  const startOfYear = new Date(dateString);
  const differenceInMs = Number(date) - Number(startOfYear);
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays + 1;
}

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

// Check if a version starts in less than 2 weeks
export function startsInLessThanTwoWeeks(startDate: Date): boolean {
  const now = new Date();
  const startDateTime = startDate;
  const diffTime = startDateTime.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 && diffDays <= 14;
}

export type VersionStatusType = {
  isRunning: boolean;
  currentDays: number;
  version?: any;
  startsInLessThanTwoWeeks?: boolean;
};

export function getEventStatus(version: Version): VersionStatusType {
  const now = new Date();
  const startDate = new Date(version.startDate);
  const duration = version.duration;
  const currentDays = diffInDays(startDate, now);
  const isRunning = currentDays >= 0 && currentDays <= duration;
  const twoWeeksCheck = startsInLessThanTwoWeeks(startDate);
  return { isRunning, currentDays, version, startsInLessThanTwoWeeks: twoWeeksCheck };
}
