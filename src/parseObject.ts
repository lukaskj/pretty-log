import { lineSeparator } from "./constants.ts";
import { isObject } from "./isObject.ts";
import { jsonParser } from "./jsonParser.ts";
import { prettifyObject } from "./prettifyObject.ts";

export async function* parseObject(chunks: AsyncIterable<string>) {
  for await (const line of chunks) {
    if (!line.length) {
      continue;
    }

    const parsed = jsonParser(line);
    if (parsed.err || !isObject(parsed.value)) {
      // pass through
      yield line;
    } else {
      yield prettifyObject(parsed.value);
    }
    yield lineSeparator;
  }
}
