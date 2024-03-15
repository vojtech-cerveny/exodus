import { cn, getInitials, getProgressDay, isToday, stringToColor } from "@/lib/utils";
import "@testing-library/jest-dom";
import moment from "moment";

describe("utils", () => {
  describe("getInitials", () => {
    it("should return initials", () => {
      expect(getInitials("Jan Novak")).toBe("JN");
    });

    it("should return initials", () => {
      expect(getInitials("Jan")).toBe("J");
    });

    it("should return initials", () => {
      expect(getInitials("Jan Novak Novak")).toBe("JNN");
    });

    it("should return initials", () => {
      expect(getInitials("")).toBe("");
    });
  });

  describe("getProgressDay", () => {
    moment.locale("cs");
    it("should return today", () => {
      const date = new Date();
      expect(getProgressDay(date)).toBe("Dnes");
    });

    it("should return yesterday", () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      expect(getProgressDay(date)).toBe("Včera");
    });

    it("should return day of the week", () => {
      const date = new Date("2021-01-01");
      expect(getProgressDay(date)).toBe("pátek");
    });
  });

  describe("isToday", () => {
    it("should return true", () => {
      const date = new Date();
      expect(isToday(date)).toBe(true);
    });

    it("should return false", () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      expect(isToday(date)).toBe(false);
    });
  });

  describe("stringToColor", () => {
    it("should return color", () => {
      expect(stringToColor("Jan Novak")).toBe("#360622");
    });

    it("should return color", () => {
      expect(stringToColor("Jan")).toBe("#f72101");
    });

    it("should return color", () => {
      expect(stringToColor("Jan Novak Novak")).toBe("#357fb0");
    });

    it("should return color", () => {
      expect(stringToColor("")).toBe("#000000");
    });

    it("should return color", () => {
      expect(stringToColor("1234567890")).toBe("#9bf68f");
    });
  });

  describe("cn", () => {
    it("should return string", () => {
      expect(cn("bg-blue-500", "bg-red-400")).toBe("bg-red-400");
    });

    it("should return string", () => {
      expect(cn("bg-blue-500", "bg-red-400", "bg-gray-100")).toBe("bg-gray-100");
    });
  });
});
