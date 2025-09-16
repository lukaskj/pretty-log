export function firstLineSpacing(isFirstLine: boolean, spacing: string, lineLen: number = 0): string {
  const lineSpacing = isFirstLine ? " " : `${spacing}`;
  if (lineLen === 0) return lineSpacing.trim();
  return lineSpacing;
}
