/** biome-ignore-all lint/suspicious/noExplicitAny: ?? */
import chalk from "chalk";
import { EOL } from "node:os";
import { inspect } from "node:util";
import { allKeys, keysMap, levelColors, levelMessageColors } from "./constants.ts";
import { getValueFromPossibleKeys } from "./getValueFromPossibleKeys";

export function prettifyObject(inputData: Record<string, any>): string {
  const message = getValueFromPossibleKeys(inputData, keysMap.message);
  const level = getValueFromPossibleKeys(inputData, keysMap.level);
  const timestamp = getValueFromPossibleKeys(inputData, keysMap.timestamp);
  const error = getValueFromPossibleKeys(inputData, keysMap.error);

  let line = "";

  let messageColor = chalk.white;

  if (level) {
    messageColor = levelMessageColors[level.value!.toLowerCase()] || chalk.white;
    const color = levelColors[level.value!.toLowerCase()] || chalk.white;
    line = color(`${level.value!.toUpperCase()}`);
    line += EOL;
  }

  if (message?.value) {
    // line += `${message.key}: ${messageColor(message.value)}${EOL}`;
    line += messageColor(`${message.key}: ${message.value}`);
    line += EOL;
  }

  if (error?.value) {
    line += messageColor(`${error.key}: ${error.value}`);
    line += EOL;
    // line += `${messageColor(error.value)}${EOL}`;
  }

  if (timestamp?.value) {
    line += `${timestamp.key}: ${chalk.gray(new Date(timestamp.value).toISOString())}${EOL}`;
  }

  const objectKeys = Object.keys(inputData).filter((key) => !allKeys.includes(key));
  for (const key of objectKeys) {
    const value = inputData[key];
    const valueString: string = inspect(value, { colors: true, depth: 5 });

    line += `${key}: ${valueString}${EOL}`;
  }

  return line.trim();
}
