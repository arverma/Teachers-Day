import { describe, expect, it } from "vitest";

import { generateScatterPositions } from "./scatter";

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
