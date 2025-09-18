import { EOL } from "node:os";
import { isObject } from "./isObject.ts";
import { jsonParser } from "./jsonParser.ts";
import { prettifyObject } from "./prettifyObject.ts";
import type { TOptions } from "./types.ts";

export function parseObject(options: TOptions) {
  return async function* (chunks: AsyncIterable<string>) {
    for await (const line of chunks) {
      if (!line.length) {
        continue;
      }

      const parsed = jsonParser(line);
      if (parsed.err || !isObject(parsed.value)) {
        // pass through
        yield line;
      } else {
        yield prettifyObject(parsed.value, options);
      }
      yield EOL;
    }
  };
}
