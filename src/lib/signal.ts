export function pickNextLineIndex(
  lineCount: number,
  currentIndex = -1,
  random: () => number = Math.random,
): number {
  if (lineCount <= 1) return 0;

  const candidate = Math.floor(random() * (lineCount - 1));
  return candidate >= currentIndex ? candidate + 1 : candidate;
}
