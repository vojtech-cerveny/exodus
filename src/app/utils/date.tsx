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
