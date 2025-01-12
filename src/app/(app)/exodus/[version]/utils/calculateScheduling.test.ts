import { calculateSchedulingFromDay } from "./calculateScheduling";

describe("calculateSchedulingFromDay", () => {
  test("should calculate correct scheduling for day 1", () => {
    const result = calculateSchedulingFromDay(1);
    expect(result).toEqual({
      week: 1,
      dayInWeek: 1,
      dayNumber: 1,
      month: 1,
    });
  });

  test("should calculate correct scheduling for middle of first week", () => {
    const result = calculateSchedulingFromDay(4);
    expect(result).toEqual({
      week: 1,
      dayInWeek: 4,
      dayNumber: 4,
      month: 1,
    });
  });

  test("should calculate correct scheduling for start of second week", () => {
    const result = calculateSchedulingFromDay(8);
    expect(result).toEqual({
      week: 2,
      dayInWeek: 1,
      dayNumber: 8,
      month: 1,
    });
  });

  test("should calculate correct scheduling for start of new month", () => {
    const result = calculateSchedulingFromDay(31);
    expect(result).toEqual({
      week: 5,
      dayInWeek: 3,
      dayNumber: 31,
      month: 2,
    });
  });

  test("should calculate correct scheduling for last day", () => {
    const result = calculateSchedulingFromDay(90);
    expect(result).toEqual({
      week: 13,
      dayInWeek: 6,
      dayNumber: 90,
      month: 3,
    });
  });

  test("should throw error for day less than 1", () => {
    expect(() => calculateSchedulingFromDay(0)).toThrow("Day must be between 1 and 90");
  });

  test("should throw error for day greater than 90", () => {
    expect(() => calculateSchedulingFromDay(91)).toThrow("Day must be between 1 and 90");
  });
});
