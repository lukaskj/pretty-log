#!/usr/bin/env node
import { fstatSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { chunksToLines } from "./chunksToLines.ts";
import { getOptions } from "./getOpt.ts";
import { parseObject } from "./parseObject.ts";

async function main() {
  const options = getOptions();

  if (!process.stdin.isTTY && !fstatSync(process.stdin.fd).isFile()) {
    process.once("SIGINT", function noOp() {});
  }

  await pipeline(process.stdin, chunksToLines, parseObject(options), process.stdout).catch((err) => {
    console.error("Pipeline failed.", err);
    process.exit(1);
  });
}

main();
