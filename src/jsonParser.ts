import sjs from "secure-json-parse";

// biome-ignore lint/suspicious/noExplicitAny: ?
export function jsonParser(input: any) {
  try {
    return { value: sjs.parse(input, { protoAction: "remove" }) };
  } catch (err) {
    return { err };
  }
}
