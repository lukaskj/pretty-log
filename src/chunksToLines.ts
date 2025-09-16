/** biome-ignore-all lint/suspicious/noExplicitAny: ? */
export async function* chunksToLines(chunks: any) {
  let previous = "";

  for await (const chunk of chunks) {
    previous += chunk;
    let eolIndex: number;

    // biome-ignore lint/suspicious/noAssignInExpressions: "explanation"
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // this line includes the EOL
      const line = previous.slice(0, eolIndex + 1);
      yield line?.trim() ?? "";
      previous = previous.slice(eolIndex + 1);
    }
  }

  if (previous.length > 0) {
    yield previous;
  }
}
