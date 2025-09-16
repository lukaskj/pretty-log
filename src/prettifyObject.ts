/** biome-ignore-all lint/suspicious/noExplicitAny: ?? */
import chalk from "chalk";
import { EOL } from "node:os";
import { inspect } from "node:util";
import { allKeys, keysMap, levelColors } from "./constants.ts";
import { firstLineSpacing } from "./firstLineSpacing.ts";
import { getValueFromPossibleKeys } from "./getValueFromPossibleKeys";

export function prettifyObject(inputData: Record<string, any>): string {
  const message = getValueFromPossibleKeys(inputData, keysMap.message);
  const level = getValueFromPossibleKeys(inputData, keysMap.level);
  const timestamp = getValueFromPossibleKeys(inputData, keysMap.timestamp);
  const error = getValueFromPossibleKeys(inputData, keysMap.error);

  let line = "";
  let spacing = "";
  let isFirstLine = true;

  if (level) {
    const color = levelColors[level.value!.toLowerCase()] || chalk.white;
    line = color(` ${level.value!.toUpperCase()} `);

    spacing = "".padEnd(level.value!.length + 3, " ");
  }

  if (message?.value) {
    isFirstLine = false;
    line = `${line} ${message.value}${EOL}`;
  }

  if (error?.value) {
    line += `${firstLineSpacing(isFirstLine, spacing, line.length)}${chalk.red(error.value)}${EOL}`;
    isFirstLine = false;
  }

  if (timestamp?.value) {
    line += `${firstLineSpacing(isFirstLine, spacing, line.length)}${timestamp.key}: ${chalk.gray(new Date(timestamp.value).toISOString())}${EOL}`;
    isFirstLine = false;
  }

  const objectKeys = Object.keys(inputData).filter((key) => !allKeys.includes(key));
  for (const key of objectKeys) {
    const value = inputData[key];
    const valueString: string = inspect(value, { colors: true, depth: 5 }).replaceAll(EOL, `\n${spacing}  `);

    line += `${firstLineSpacing(isFirstLine, spacing, line.length)}${key}: ${valueString}${EOL}`;
    isFirstLine = false;
  }

  return line.trim();
}
