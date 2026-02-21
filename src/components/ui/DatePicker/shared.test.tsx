import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatDate,
  getMonthNames,
  getWeekDayNames,
  isValidDate,
  resolveLocale,
} from "./shared";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("DatePicker shared utilities", () => {
  describe("resolveLocale", () => {
    it("returns the same locale when valid", () => {
      expect(resolveLocale("fr-FR")).toBe("fr-FR");
    });

    it("falls back to en-US and logs error when locale is invalid", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      const locale = resolveLocale(
        "zz_ZZ" as Intl.UnicodeBCP47LocaleIdentifier,
      );

      expect(locale).toBe("en-US");
      expect(spy).toHaveBeenCalledWith(
        '[DatePicker] Invalid locale "zz_ZZ" passed. Falling back to "en-US".',
      );
    });

    it("logs only once for repeated use of the same invalid locale", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const invalid = "yy_YY" as Intl.UnicodeBCP47LocaleIdentifier;

      resolveLocale(invalid);
      resolveLocale(invalid);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("formatDate", () => {
    it("formats date with default en-US locale", () => {
      const date = new Date(2026, 0, 15);
      expect(formatDate(date)).toBe("Jan 15, 2026");
    });

    it("formats date with fr-FR locale", () => {
      const date = new Date(2026, 0, 15);
      const result = formatDate(date, "fr-FR");
      expect(result).toMatch(/15/);
      expect(result).toMatch(/janv\.|janvier/i);
      expect(result).toMatch(/2026/);
    });

    it("formats date with de-DE locale", () => {
      const date = new Date(2026, 0, 15);
      const result = formatDate(date, "de-DE");
      expect(result).toMatch(/15/);
      expect(result).toMatch(/Jan/i);
      expect(result).toMatch(/2026/);
    });

    it("returns empty string for undefined date", () => {
      expect(formatDate(undefined)).toBe("");
    });

    it("falls back to en-US and logs error for invalid locale", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const date = new Date(2026, 0, 15);

      const result = formatDate(
        date,
        "en_US" as Intl.UnicodeBCP47LocaleIdentifier,
      );

      expect(result).toBe("Jan 15, 2026");
      expect(spy).toHaveBeenCalledWith(
        '[DatePicker] Invalid locale "en_US" passed. Falling back to "en-US".',
      );
    });
  });

  describe("getWeekDayNames", () => {
    it("returns English weekday names by default", () => {
      const days = getWeekDayNames();
      expect(days).toHaveLength(7);
      expect(days[0]).toMatch(/sun/i);
      expect(days[1]).toMatch(/mon/i);
      expect(days[6]).toMatch(/sat/i);
    });

    it("returns French weekday names for fr-FR", () => {
      const days = getWeekDayNames("fr-FR");
      expect(days).toHaveLength(7);
      expect(days[0]).toMatch(/dim/i);
      expect(days[1]).toMatch(/lun/i);
    });

    it("returns Spanish weekday names for es-ES", () => {
      const days = getWeekDayNames("es-ES");
      expect(days).toHaveLength(7);
      expect(days[0]).toMatch(/dom|do/i);
      expect(days[1]).toMatch(/lun|lu/i);
    });

    it("falls back to en-US weekdays for invalid locale", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      const days = getWeekDayNames(
        "de_DE" as Intl.UnicodeBCP47LocaleIdentifier,
      );

      expect(days).toHaveLength(7);
      expect(days[0]).toMatch(/sun/i);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getMonthNames", () => {
    it("returns English month names by default", () => {
      const months = getMonthNames();
      expect(months).toHaveLength(12);
      expect(months[0]).toBe("January");
      expect(months[11]).toBe("December");
    });

    it("returns French month names for fr-FR", () => {
      const months = getMonthNames("fr-FR");
      expect(months).toHaveLength(12);
      expect(months[0]).toMatch(/janvier/i);
      expect(months[11]).toMatch(/d[ée]cembre/i);
    });

    it("returns German month names for de-DE", () => {
      const months = getMonthNames("de-DE");
      expect(months).toHaveLength(12);
      expect(months[0]).toMatch(/januar/i);
      expect(months[11]).toMatch(/dezember/i);
    });

    it("falls back to en-US months for invalid locale", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      const months = getMonthNames(
        "fr_FR" as Intl.UnicodeBCP47LocaleIdentifier,
      );

      expect(months).toHaveLength(12);
      expect(months[0]).toBe("January");
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("isValidDate", () => {
    it("returns true for valid dates", () => {
      expect(isValidDate(new Date(2026, 0, 15))).toBe(true);
      expect(isValidDate(new Date())).toBe(true);
    });

    it("returns false for invalid dates", () => {
      expect(isValidDate(new Date(Number.NaN))).toBe(false);
      expect(isValidDate(new Date("not-a-date"))).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isValidDate(undefined)).toBe(false);
    });
  });
});
