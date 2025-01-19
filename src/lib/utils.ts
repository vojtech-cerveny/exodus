import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

/**
 *
 * @param inputs array of classes to merge
 * @returns tailwind classname without duplicates and problems with conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (name.length === 0) return '';
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');
}

export function getProgressDay(progressDate: Date) {
  const date = moment(progressDate).startOf('day');
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  return date.isSame(today) ? 'Dnes' : date.isSame(yesterday) ? 'Včera' : date.format('dddd');
}

export function isToday(date: Date) {
  return moment(date).isSame(moment(), 'day');
}

/**
 * Function to convert string to color to have consistent color for the same string
 * @param str - we mostly use `user.id` to have consistent color for the same user
 * @returns color in HEX format - `#ffffff`
 */
export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

type CopyType = 'Link' | 'Text';

export const handleCopyClick = (text: string, type: CopyType) => {
  navigator.clipboard.writeText(text);
  toast(type + ' byl zkopírován do schránky.');
};
