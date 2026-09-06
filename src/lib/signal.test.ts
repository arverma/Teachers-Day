import { describe, expect, it } from "vitest";

import { pickNextLineIndex } from "./signal";

describe("pickNextLineIndex", () => {
  it("selects a valid line and avoids immediately repeating the current one", () => {
    expect(pickNextLineIndex(8, 3, () => 0)).toBe(0);
    expect(pickNextLineIndex(8, 3, () => 0.49)).not.toBe(3);
    expect(pickNextLineIndex(1, 0, () => 0.8)).toBe(0);
  });
});
