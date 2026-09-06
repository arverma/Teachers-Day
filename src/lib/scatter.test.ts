import { describe, expect, it } from "vitest";

import { generateCollisionFreeLayout, generateScatterPositions } from "./scatter";

describe("generateScatterPositions", () => {
  it("keeps randomly scattered circles inside their cluster without collisions", () => {
    let seed = 17;
    const random = () => {
      seed = (seed * 48271) % 2147483647;
      return seed / 2147483647;
    };

    const positions = generateScatterPositions({
      count: 11,
      width: 280,
      height: 190,
      itemSize: 34,
      random,
    });

    expect(positions).toHaveLength(11);
    for (const position of positions) {
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThanOrEqual(246);
      expect(position.y).toBeLessThanOrEqual(156);
    }

    for (let index = 0; index < positions.length; index += 1) {
      for (let other = index + 1; other < positions.length; other += 1) {
        const distance = Math.hypot(
          positions[index].x - positions[other].x,
          positions[index].y - positions[other].y,
        );
        expect(distance).toBeGreaterThanOrEqual(30);
      }
    }
  });
});

describe("generateCollisionFreeLayout", () => {
  it("randomly places mixed-size labels and circles inside one canvas without collisions", () => {
    let seed = 41;
    const random = () => {
      seed = (seed * 48271) % 2147483647;
      return seed / 2147483647;
    };
    const items = [
      { width: 150, height: 18 },
      { width: 112, height: 18 },
      ...Array.from({ length: 23 }, () => ({ width: 34, height: 34 })),
    ];

    const positions = generateCollisionFreeLayout({
      items,
      width: 390,
      height: 620,
      gap: 8,
      random,
    });

    expect(positions).toHaveLength(items.length);
    positions.forEach((position, index) => {
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.x + items[index].width).toBeLessThanOrEqual(390);
      expect(position.y + items[index].height).toBeLessThanOrEqual(620);
    });

    for (let index = 0; index < positions.length; index += 1) {
      for (let other = index + 1; other < positions.length; other += 1) {
        const a = { ...positions[index], ...items[index] };
        const b = { ...positions[other], ...items[other] };
        const separated =
          a.x + a.width + 8 <= b.x ||
          b.x + b.width + 8 <= a.x ||
          a.y + a.height + 8 <= b.y ||
          b.y + b.height + 8 <= a.y;
        expect(separated).toBe(true);
      }
    }
  });
});
