import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function getProgressDay(progressDate: Date) {
  const date = moment(progressDate).startOf("day");
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  return date.isSame(today) ? "Dnes" : date.isSame(yesterday) ? "Včera" : date.format("dddd");
}

export function isToday(date: Date) {
  return moment(date).isSame(moment(), "day");
}

export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

type CopyType = "Link" | "Text";

export const handleCopyClick = (text: string, type: CopyType) => {
  navigator.clipboard.writeText(text);
  toast(type + " byl zkopírován do schránky.");
};
