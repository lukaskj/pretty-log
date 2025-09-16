import { describe, expect, it } from "bun:test";
import { firstLineSpacing } from "../src/firstLineSpacing";

describe("firstLineSpacing", () => {
  it("should return a single space for first line regardless of spacing input", () => {
    expect(firstLineSpacing(true, "    ", 1)).toBe(" ");
    expect(firstLineSpacing(true, "\t\t", 1)).toBe(" ");
    expect(firstLineSpacing(true, "", 1)).toBe(" ");
  });

  it("should return the provided spacing for non-first lines", () => {
    expect(firstLineSpacing(false, "    ", 1)).toBe("    ");
    expect(firstLineSpacing(false, "\t\t", 1)).toBe("\t\t");
    expect(firstLineSpacing(false, "", 1)).toBe("");
  });

  it("should trim spacing when lineLen is 0", () => {
    expect(firstLineSpacing(false, "    ", 0)).toBe("");
    expect(firstLineSpacing(false, "\t\t", 0)).toBe("");
    expect(firstLineSpacing(false, "", 0)).toBe("");
  });

  it("should trim spacing for first line when lineLen is 0", () => {
    expect(firstLineSpacing(true, "    ", 0)).toBe("");
    expect(firstLineSpacing(true, "\t\t", 0)).toBe("");
    expect(firstLineSpacing(true, "", 0)).toBe("");
  });

  it("should handle default lineLen parameter", () => {
    expect(firstLineSpacing(true, "    ")).toBe("");
    expect(firstLineSpacing(false, "    ")).toBe("");
  });

  it("should preserve spacing characters for non-first lines when lineLen > 0", () => {
    const mixedSpacing = "  \t  ";
    expect(firstLineSpacing(false, mixedSpacing, 10)).toBe(mixedSpacing);
  });
});
