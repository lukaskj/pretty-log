import { describe, expect, it } from "bun:test";
import { parseObject } from "../src/parseObject";
import { EOL } from "node:os";

const lineSeparator = EOL;

describe("parseObject", () => {
  async function collectOutput(generator: AsyncGenerator<string>): Promise<string[]> {
    const result = [];
    for await (const chunk of generator) {
      result.push(chunk);
    }
    return result;
  }

  function makeAsyncIterable(items: string[]): AsyncIterable<string> {
    return {
      async *[Symbol.asyncIterator]() {
        for (const item of items) {
          yield item;
        }
      },
    };
  }

  it("should handle empty and whitespace lines", async () => {
    const input = makeAsyncIterable(["", "  ", "\n"]);
    const result = await collectOutput(parseObject(input));
    // Empty lines are still passed through and separated
    expect(result).toEqual(["  ", lineSeparator, "\n", lineSeparator]);
  });

  it("should pass through non-JSON lines unchanged", async () => {
    const input = makeAsyncIterable(["not a json string"]);
    const result = await collectOutput(parseObject(input));
    expect(result).toEqual(["not a json string", lineSeparator]);
  });

  it("should pass through non-object JSON unchanged", async () => {
    const input = makeAsyncIterable(["123", '"string"', "[1,2,3]"]);
    const result = await collectOutput(parseObject(input));
    expect(result).toEqual(["123", lineSeparator, '"string"', lineSeparator, "[1,2,3]", lineSeparator]);
  });

  it("should prettify valid JSON objects", async () => {
    const input = makeAsyncIterable(['{"level":"info","message":"test message"}']);
    const result = await collectOutput(parseObject(input));

    // The exact format will depend on prettifyObject implementation
    expect(result.length).toBe(2); // prettified object + separator
    expect(result[0]).toContain("INFO");
    expect(result[0]).toContain("test message");
    expect(result[1]).toBe(lineSeparator);
  });

  it("should handle multiple lines", async () => {
    const input = makeAsyncIterable([
      '{"level":"debug","message":"first"}',
      '{"level":"info","message":"second"}',
      "not json",
      '{"invalid": json}',
    ]);
    const result = await collectOutput(parseObject(input));

    expect(result.length).toBe(8); // 4 lines * (content + separator)
    expect(result[0]).toContain("DEBUG");
    expect(result[0]).toContain("first");
    expect(result[2]).toContain("INFO");
    expect(result[2]).toContain("second");
    expect(result[4]).toBe("not json");
    expect(result[6]).toBe('{"invalid": json}');
  });

  it("should handle chunks split across JSON", async () => {
    const input = makeAsyncIterable(['{"level":"info",', '"message":"test"}"']);
    const result = await collectOutput(parseObject(input));

    // Each chunk should be treated as a separate line
    expect(result).toEqual(['{"level":"info",', lineSeparator, '"message":"test"}"', lineSeparator]);
  });

  it("should handle objects with nested structures", async () => {
    const input = makeAsyncIterable(['{"level":"info","message":"test","details":{"key":"value"}}']);
    const result = await collectOutput(parseObject(input));

    expect(result.length).toBe(2);
    expect(result[0]).toContain("INFO");
    expect(result[0]).toContain("test");
    expect(result[0]).toContain("key");
    expect(result[0]).toContain("value");
    expect(result[1]).toBe(lineSeparator);
  });
});
