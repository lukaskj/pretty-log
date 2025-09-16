/** biome-ignore-all lint/suspicious/noExplicitAny: ... */
export function getValueFromPossibleKeys(
  obj: Record<string, any>,
  possibleKeys: string | string[],
): { key: string; value: string | undefined } | undefined {
  if (typeof possibleKeys === "string") {
    return {
      key: possibleKeys,
      value: obj[possibleKeys],
    };
  }

  for (const key of possibleKeys) {
    if (key in obj) {
      return {
        key,
        value: obj[key],
      };
    }
  }
}
