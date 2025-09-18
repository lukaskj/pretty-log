import { parseArgs } from "node:util";
import type { TOptions } from "./types";

const defaultOptions: TOptions = {
  maxLines: 6,
};

export function getOptions(): TOptions {
  const args = parseArgs({
    options: {
      maxLines: {
        type: "string",
        short: "m",
      },
      help: {
        type: "boolean",
        short: "h",
        description: "Show this help message",
      },
    },
    allowPositionals: false,
  }).values;

  const options: TOptions = {
    ...defaultOptions,
    maxLines: args.maxLines ? Math.max(1, Number(args.maxLines)) : defaultOptions.maxLines,
  };

  if (args.help) {
    console.log(`Usage: pretty-log [options]

Options:
  -m, --maxLines <number>  Maximum number of lines to display for objects (default: ${defaultOptions.maxLines})
  -h, --help               Show this help message
`);
    process.exit(0);
  }
  return options;
}
