import { describe, expect, it } from "vitest";

import { people } from "./people";
import { siteConfig } from "./site";
import { validatePeople } from "./validate";

describe("recipient configuration", () => {
  it("contains the four requested fictional examples", () => {
    expect(people).toHaveLength(4);
    expect(new Set(people.map((person) => person.category))).toEqual(
      new Set(["teacher", "professor", "mentor"]),
    );
  });

  it("accepts the shipped recipient data", () => {
    expect(() => validatePeople(people, siteConfig.journey)).not.toThrow();
  });

  it("rejects duplicate slugs", () => {
    expect(() => validatePeople([people[0], people[0]], siteConfig.journey)).toThrow(
      /duplicate slug/i,
    );
  });

  it("rejects stages that are absent from the global journey", () => {
    const invalidPerson = { ...people[0], stages: ["missing-stage"] };
    expect(() => validatePeople([invalidPerson], siteConfig.journey)).toThrow(
      /unknown stage/i,
    );
  });

  it("requires at least one stage or chapter", () => {
    const unplacedPerson = { ...people[0], stages: [], chapters: [] };
    expect(() => validatePeople([unplacedPerson], siteConfig.journey)).toThrow(
      /journey stage/i,
    );
  });
});
