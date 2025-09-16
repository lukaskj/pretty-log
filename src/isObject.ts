/** biome-ignore-all lint/suspicious/noExplicitAny: , */
export function isObject(input: any): input is Record<string, any> {
  return Object.prototype.toString.apply(input) === "[object Object]";
}
