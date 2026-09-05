import { describe, expect, it } from "vitest";

import { getPersonBySlug, people } from "./people";
import { siteConfig } from "./site";
import { validatePeople } from "./validate";

describe("recipient configuration", () => {
  it("contains the required mentor templates across Aman's journey", () => {
    expect(people.map((person) => person.slug)).toEqual(
      expect.arrayContaining([
        "khalid-kareem-khan",
        "mr-chingangbam-collin-singh",
        "salam-monorama-devi",
        "dr-kavya-sen",
        "sigmoid-senior",
        "flipkart-senior",
        "quillbot-senior",
      ]),
    );
    expect(new Set(people.map((person) => person.category))).toEqual(
      new Set(["teacher", "professor", "engineering-admin", "mentor"]),
    );

    expect(getPersonBySlug("arjun-mentor")).toBeUndefined();
    expect(getPersonBySlug("sigmoid-senior")?.stages).toEqual(["sigmoid"]);
    expect(getPersonBySlug("flipkart-senior")?.stages).toEqual(["flipkart"]);
    expect(getPersonBySlug("quillbot-senior")?.stages).toEqual(["quillbot"]);
  });

  it("keeps engineering administrators separate from professors", () => {
    expect(getPersonBySlug("mr-chingangbam-collin-singh")).toMatchObject({
      category: "engineering-admin",
      relationshipLabel: "Engineering Administration",
      stages: ["engineering"],
    });
    expect(getPersonBySlug("salam-monorama-devi")).toMatchObject({
      category: "engineering-admin",
      relationshipLabel: "Engineering Administration",
      stages: ["engineering"],
    });
  });

  it("uses Aman's verified education and career timeline", () => {
    expect(siteConfig.journey.map((stage) => stage.id)).toEqual([
      "school",
      "engineering",
      "sigmoid",
      "flipkart",
      "quillbot",
      "mba",
      "today",
    ]);

    expect(getPersonBySlug("dr-nagesh-ch")?.pathsCrossed?.entries[0]).toMatchObject({
      organization: "IIIT Senapati, Manipur",
      period: "2015 - 2019",
    });
    expect(getPersonBySlug("dr-kavya-sen")?.pathsCrossed?.entries[0]).toMatchObject({
      organization: "IIM Bodh Gaya",
      period: "2025 - 2027",
    });
  });

  it("links to Aman's supplied LinkedIn profile", () => {
    expect(siteConfig.author.fullName).toBe("Aman Ranjan Verma");
    expect(siteConfig.author.linkedinUrl).toBe("https://www.linkedin.com/in/ar-verma");
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
