interface Scheduling {
  week: number;
  dayInWeek: number;
  dayNumber: number;
  month: number;
}

export const calculateSchedulingFromDay = (day: number): Scheduling => {
  // Ensure day is between 1 and 90
  if (day < 1 || day > 90) {
    throw new Error("Day must be between 1 and 90");
  }

  return {
    week: Math.ceil(day / 7), // Week number (1-13)
    dayInWeek: ((day - 1) % 7) + 1, // Day in week (1-7, where 1 is Monday)
    dayNumber: day, // The specific day number
    month: Math.ceil(day / 30), // Month number (1-3)
  };
};
