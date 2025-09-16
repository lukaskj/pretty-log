import chalk, { type ChalkInstance } from "chalk";
import { EOL } from "node:os";

export const levelColors: Record<string, ChalkInstance> = {
  default: chalk.bgWhite,
  debug: chalk.bgBlue,
  info: chalk.bgGreen,
  notice: chalk.bgCyan,
  error: chalk.bgRed,
  warning: chalk.bgYellow,
  warn: chalk.bgYellow,
  crit: chalk.bgRedBright,
  alert: chalk.bgRedBright,
  emerg: chalk.bgRedBright,
};

export const levelMessageColors: Record<string, ChalkInstance> = {
  default: chalk.white,
  debug: chalk.blue,
  info: chalk.green,
  notice: chalk.cyan,
  error: chalk.red,
  warning: chalk.yellow,
  warn: chalk.yellow,
  crit: chalk.redBright,
  alert: chalk.redBright,
  emerg: chalk.redBright,
};

export const keysMap = {
  level: ["severity", "level"],
  message: ["message", "msg"],
  error: "error",
  timestamp: ["time", "timestamp", "ts", "date"],
};

export const allKeys = Object.values(keysMap).flat();

export const lineSeparator = `${EOL}--------------------------------${EOL}`;
