/** biome-ignore-all lint/suspicious/noExplicitAny: . */
import { fstatSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { chunksToLines } from "./chunksToLines.ts";
import { parseObject } from "./parseObject.ts";

async function main() {
  if (!process.stdin.isTTY && !fstatSync(process.stdin.fd).isFile()) {
    process.once("SIGINT", function noOp() {});
  }

  await pipeline(process.stdin, chunksToLines, parseObject, process.stdout).catch((err) => {
    console.error("Pipeline failed.", err);
    process.exit(1);
  });
}

main();
