import type { JourneyStage, PersonConfig } from "./types";

export function validatePeople(
  recipients: readonly PersonConfig[],
  journey: readonly JourneyStage[],
): void {
  const stageIds = new Set(journey.map((stage) => stage.id));
  const slugs = new Set<string>();

  for (const person of recipients) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(person.slug)) {
      throw new Error(`Invalid slug: ${person.slug}`);
    }
    if (slugs.has(person.slug)) {
      throw new Error(`Duplicate slug: ${person.slug}`);
    }
    slugs.add(person.slug);

    const referencedStages = [
      ...person.stages,
      ...(person.chapters?.map((chapter) => chapter.stage) ?? []),
    ];
    for (const stage of referencedStages) {
      if (!stageIds.has(stage)) {
        throw new Error(`Unknown stage "${stage}" for ${person.slug}`);
      }
    }

    if (!person.displayName.trim() || !person.intro.subtitle.trim()) {
      throw new Error(`Missing introductory content for ${person.slug}`);
    }
    if (!person.whatStayed.title.trim() || person.whatStayed.description.length === 0) {
      throw new Error(`Missing what-stayed content for ${person.slug}`);
    }
    if (!person.note.salutation.trim() || person.note.paragraphs.length === 0) {
      throw new Error(`Missing personal note for ${person.slug}`);
    }
    if (person.easterEgg?.enabled && person.easterEgg.lines.length === 0) {
      throw new Error(`Enabled easter egg has no lines for ${person.slug}`);
    }
  }
}

