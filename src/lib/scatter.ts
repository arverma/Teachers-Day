export interface ScatterPosition {
  x: number;
  y: number;
}

export interface LayoutItem {
  width: number;
  height: number;
}

interface CollisionFreeLayoutOptions {
  items: LayoutItem[];
  width: number;
  height: number;
  gap?: number;
  random?: () => number;
}

const rectanglesOverlap = (
  a: ScatterPosition & LayoutItem,
  b: ScatterPosition & LayoutItem,
  gap: number,
) => !(
  a.x + a.width + gap <= b.x ||
  b.x + b.width + gap <= a.x ||
  a.y + a.height + gap <= b.y ||
  b.y + b.height + gap <= a.y
);

export function generateCollisionFreeLayout({
  items,
  width,
  height,
  gap = 8,
  random = Math.random,
}: CollisionFreeLayoutOptions): ScatterPosition[] {
  for (let restart = 0; restart < 80; restart += 1) {
    const placed: Array<ScatterPosition & LayoutItem> = [];
    let failed = false;

    for (const item of items) {
      const maxX = Math.max(0, width - item.width);
      const maxY = Math.max(0, height - item.height);
      let candidate: (ScatterPosition & LayoutItem) | undefined;

      for (let attempt = 0; attempt < 1400; attempt += 1) {
        const next = {
          x: random() * maxX,
          y: random() * maxY,
          width: item.width,
          height: item.height,
        };
        if (!placed.some((existing) => rectanglesOverlap(next, existing, gap))) {
          candidate = next;
          break;
        }
      }

      if (!candidate) {
        failed = true;
        break;
      }
      placed.push(candidate);
    }

    if (!failed) return placed.map(({ x, y }) => ({ x, y }));
  }

  throw new Error("The constellation is too dense for collision-free placement.");
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
