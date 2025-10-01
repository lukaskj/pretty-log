import { parseArgs } from "node:util";
import type { TOptions } from "./types";

const defaultOptions: TOptions = {
  maxLines: 6,
};

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
export function getOptions(): TOptions {
  // biome-ignore lint/suspicious/noExplicitAny: whatever
  const args = parseArgs(argsConfig as any).values;

  const options: TOptions = {
    ...defaultOptions,
    maxLines: args.maxLines ? Math.max(1, Number(args.maxLines)) : defaultOptions.maxLines,
    ...args,
  };

  if (args.help) {
    console.log("Usage: pretty-log [options]\n\nOptions:");
    console.log(getHelpMessage());
    process.exit(0);
  }

  return options;
}

function getHelpMessage(): string {
  return Object.entries(argsConfig.options)
    .map(([key, opt]) => {
      const shortFlag = "short" in opt ? ` -${opt.short}, ` : "     ";
      const fullFlag = `--${key}`;
      const value = opt.type === "boolean" ? "" : "<value>";
      const command = `${shortFlag}${fullFlag}`;

      return {
        command,
        value,
        description: opt.description,
        fullLength: command.length + value.length,
      };
    })
    .reduce(
      (acc, { command, value, description, fullLength }) => {
        const maxLength = Math.max(...acc.map((item) => item.fullLength));
        const paddedCommand = `${command.padEnd(maxLength - value.length, " ")} ${value}`;

        acc.push({
          fullLength,
          line: `${paddedCommand.padEnd(maxLength, " ")} ${description}`,
        });

        return acc;
      },
      [] as Array<{ fullLength: number; line: string }>,
    )
    .map(({ line }) => line)
    .join("\n");
}
