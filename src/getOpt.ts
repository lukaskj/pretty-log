import { parseArgs } from "node:util";
import type { TOptions } from "./types";

const defaultOptions: TOptions = {
  maxLines: 6,
};

export function getOptions(): TOptions {
  const argsConfig = {
    options: {
      maxLines: {
        type: "string",
        short: "m",
        description: `Maximum number of lines to display for objects (default: ${defaultOptions.maxLines})`,
      },
      trim: {
        type: "string",
        short: "t",
        description:
          'Trim string to strip from the start of each line (default: none, e.g. use ">  " for logs prefixed with "> ")',
        multiple: true,
      },
      help: {
        type: "boolean",
        short: "h",
        description: "Show this help message",
      },
    },
    allowPositionals: false,
  };
  // biome-ignore lint/suspicious/noExplicitAny: whatever
  const args = parseArgs(argsConfig as any).values;

  const options: TOptions = {
    ...defaultOptions,
    maxLines: args.maxLines ? Math.max(1, Number(args.maxLines)) : defaultOptions.maxLines,
    ...args,
  };

  const helpLines: string[] = [];

  if (args.help) {
    for (const _key in argsConfig.options) {
      const key = _key as keyof typeof argsConfig.options;
      const opt = argsConfig.options[key];
      helpLines.push(
        `  ${"short" in opt ? `-${opt.short}, ` : ""}--${key} ${opt.type === "boolean" ? "" : `<${opt.type}>`}  ${opt.description}`,
      );
    }
    console.log(`Usage: pretty-log [options]

Options:\n`);
    console.log(helpLines.join("\n"));
    process.exit(0);
  }

  return options;
}
