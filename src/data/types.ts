export type RecipientCategory =
  | "teacher"
  | "professor"
  | "engineering-admin"
  | "mentor"
  | "manager"
  | "colleague"
  | "other";

export interface JourneyStage {
  id: string;
  label: string;
}

export interface JourneyChapter {
  stage: string;
  label: string;
  period?: string;
  context?: string;
}

export interface Crossing {
  eyebrow?: string;
  title: string;
  organization?: string;
  period?: string;
  description?: string;
}

export interface PersonConfig {
  slug: string;
  name: string;
  displayName: string;
  category: RecipientCategory;
  relationshipLabel: string;
  stages: string[];
  chapters?: JourneyChapter[];
  intro: {
    eyebrow?: string;
    subtitle: string;
  };
  openingThought?: {
    lines?: string[];
    followUp: string;
  };
  pathsCrossed?: {
    enabled?: boolean;
    title?: string;
    entries: Crossing[];
  };
  whatStayed: {
    title: string;
    description: string[];
  };
  thenNow?: {
    enabled: boolean;
    then: { label?: string; title: string; description?: string };
    now: { label?: string; title: string; description?: string };
  };
  note: {
    salutation: string;
    paragraphs: string[];
    closing?: string;
    signature?: string;
  };
  easterEgg?: {
    enabled: boolean;
    type: "git" | "code" | "quote";
    heading?: string;
    command?: string;
    lines: string[];
  };
}
