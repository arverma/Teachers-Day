export interface ScatterPosition {
  x: number;
  y: number;
}

interface ScatterOptions {
  count: number;
  width: number;
  height: number;
  itemSize: number;
  random?: () => number;
}

export function generateScatterPositions({
  count,
  width,
  height,
  itemSize,
  random = Math.random,
}: ScatterOptions): ScatterPosition[] {
  const maxX = Math.max(0, width - itemSize);
  const maxY = Math.max(0, height - itemSize);
  const densityDistance = Math.sqrt((width * height) / Math.max(count, 1)) * 0.7;
  const minimumDistance = Math.min(itemSize * 0.9, densityDistance);
  const positions: ScatterPosition[] = [];

  for (let index = 0; index < count; index += 1) {
    let best = { x: random() * maxX, y: random() * maxY };
    let bestDistance = -1;

    for (let attempt = 0; attempt < 600; attempt += 1) {
      const candidate = { x: random() * maxX, y: random() * maxY };
      const nearest = positions.length
        ? Math.min(...positions.map((position) => Math.hypot(candidate.x - position.x, candidate.y - position.y)))
        : Number.POSITIVE_INFINITY;

      if (nearest >= minimumDistance) {
        best = candidate;
        break;
      }

      if (nearest > bestDistance) {
        best = candidate;
        bestDistance = nearest;
      }
    }

    positions.push(best);
  }

  return positions;
}
