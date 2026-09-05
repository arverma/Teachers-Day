import type { PersonConfig } from "./types";
import { siteConfig } from "./site";
import { validatePeople } from "./validate";

type MentorKind = "school-teacher" | "engineering-professor" | "mba-faculty" | "career-mentor";

interface MentorDraft {
  slug: string;
  name: string;
  kind: MentorKind;
  note?: string[];
}

/*
 * QUICK EDIT AREA
 * Usually you only need to change `slug`, `name`, and optionally `note`.
 * The longer journey, institution, date, and career copy is generated below
 * from the verified timeline in Aman's CV.
 */
const mentorDrafts: MentorDraft[] = [
  { slug: "meera-maam", name: "Meera Ma'am", kind: "school-teacher" },
  { slug: "dr-nagesh-ch", name: "Dr. Nagesh Ch", kind: "engineering-professor" },
  { slug: "dr-kavya-sen", name: "Dr. Kavya Sen", kind: "mba-faculty" },
  { slug: "arjun-mentor", name: "Arjun", kind: "career-mentor" },
];

interface MentorPreset extends Omit<PersonConfig, "slug" | "name" | "displayName" | "note"> {
  defaultNote: string[];
}

const mentorPresets: Record<MentorKind, MentorPreset> = {
  "school-teacher": {
    category: "teacher",
    relationshipLabel: "School Teacher",
    stages: ["school"],
    chapters: [{ stage: "school", label: "School years" }],
    intro: { subtitle: "A small corner of the internet made to say thank you." },
    openingThought: {
      followUp:
        "Our paths crossed before the degrees and job titles. The confidence to keep learning began in classrooms like yours.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "School",
          title: "The foundation years",
          period: "School years",
          description:
            "The chapter that came before engineering, a gold medal, and a career spent learning how complex systems work.",
        },
      ],
    },
    whatStayed: {
      title: "Curiosity",
      description: [
        "The habit of asking one more question became part of how I learn and solve problems.",
        "It followed me from being a school topper to IIIT Manipur, and later into a career building data systems used at enormous scale.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "A student learning to trust his questions." },
      now: { title: "A senior data engineer who still begins by asking why." },
    },
    defaultNote: [
      "I may not remember every page we covered, but I remember the confidence that a patient teacher can place in a student.",
      "Thank you for contributing to the foundation on which every later chapter was built.",
    ],
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  "engineering-professor": {
    category: "professor",
    relationshipLabel: "Engineering Professor",
    stages: ["engineering"],
    chapters: [
      {
        stage: "engineering",
        label: "Electronics & Communication Engineering",
        period: "2015 - 2019",
      },
    ],
    intro: { eyebrow: "FOR", subtitle: "A note for one of the people whose lessons stayed." },
    openingThought: {
      followUp:
        "Our paths crossed at IIIT Manipur, while engineering was still becoming a way of thinking rather than only a degree.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "Engineering",
          title: "A classroom where questions were welcome",
          organization: "IIIT Senapati, Manipur",
          period: "2015 - 2019",
          description:
            "Four years in Electronics and Communication Engineering, completed with a 9.13 CPI and a gold medal.",
        },
      ],
    },
    whatStayed: {
      title: "Rigor",
      description: [
        "Engineering taught me to move past a plausible answer and look for one that can withstand careful questioning.",
        "That standard now shapes how I design distributed systems, review technical decisions, and document work for the people who inherit it.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "An ECE student learning to make ideas precise." },
      now: {
        title: "A senior data engineer—and a member of IIIT Manipur's Board of Studies—still applying that rigor.",
      },
    },
    defaultNote: [
      "Thank you for expecting precision without making uncertainty feel embarrassing.",
      "The rigor of those engineering years stayed with me through every system I built and every difficult problem I learned to explain clearly.",
    ],
    easterEgg: {
      enabled: true,
      type: "code",
      heading: "One last thing",
      lines: ["understand(idea)", "  before", "implement(idea)"],
    },
  },
  "mba-faculty": {
    category: "professor",
    relationshipLabel: "MBA Faculty",
    stages: ["mba"],
    chapters: [{ stage: "mba", label: "MBA", period: "2025 - 2027" }],
    intro: { subtitle: "Something thoughtful, for someone who changed how I frame a problem." },
    openingThought: {
      followUp:
        "Our paths crossed at IIM Bodh Gaya, after engineering and years of building data platforms had already shaped how I saw problems.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "MBA",
          title: "A wider view of decisions and their consequences",
          organization: "IIM Bodh Gaya",
          period: "2025 - 2027",
          description:
            "An MBA chapter alongside a career in data engineering, connecting technical choices with people, strategy, and business outcomes.",
        },
      ],
    },
    whatStayed: {
      title: "Perspective",
      description: [
        "The questions you asked widened the frame—from how a system works to why it should exist and whom it should serve.",
        "That perspective now accompanies the technical judgment, stakeholder communication, and ownership my work demands.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "An engineer used to solving for correctness and scale." },
      now: { title: "A leader learning to solve for people, strategy, and lasting value too." },
    },
    defaultNote: [
      "Thank you for helping me see familiar problems from unfamiliar angles.",
      "The lessons from this chapter are already changing how I communicate decisions, work with stakeholders, and think beyond the implementation.",
    ],
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  "career-mentor": {
    category: "mentor",
    relationshipLabel: "Career Mentor",
    stages: ["sigmoid", "flipkart", "quillbot"],
    chapters: [
      { stage: "sigmoid", label: "Software Engineer I · Sigmoid", period: "2019 - 2021" },
      { stage: "flipkart", label: "Data Engineer II · Flipkart", period: "2021 - 2023" },
      { stage: "quillbot", label: "Senior Data Engineer · QuillBot", period: "2023 - Present" },
    ],
    intro: { eyebrow: "FOR", subtitle: "For someone who helped turn experience into judgment." },
    openingThought: {
      followUp:
        "Our paths crossed somewhere between my first production data pipelines and the responsibility of designing platforms at petabyte scale.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "2019 - 2021",
          title: "Learning to put data and machine-learning systems into production",
          organization: "Sigmoid",
        },
        {
          eyebrow: "2021 - 2023",
          title: "Taking ownership of financial data systems serving millions",
          organization: "Flipkart",
        },
        {
          eyebrow: "2023 - Present",
          title: "Architecting secure, petabyte-scale platforms and mentoring others",
          organization: "QuillBot",
        },
      ],
    },
    whatStayed: {
      title: "Ownership",
      description: [
        "You helped me see that seniority is less about having every answer and more about taking responsibility for finding the right one.",
        "That lesson stayed through migrations, security work, difficult team transitions, and the responsibility of helping other engineers grow.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "An engineer learning how production systems really behave." },
      now: { title: "A senior engineer designing for scale, continuity, and the people behind the systems." },
    },
    defaultNote: [
      "Thank you for sharing judgment, not just answers, and for trusting me with problems that required real ownership.",
      "What I learned from you continues to shape how I build, lead, document, and mentor today.",
    ],
    easterEgg: {
      enabled: true,
      type: "git",
      heading: "One last thing",
      command: "git log --mentor",
      lines: [
        "Added ownership.",
        "Improved engineering judgement.",
        "Made curiosity a permanent dependency.",
        "",
        "Status: still in production.",
      ],
    },
  },
};

function createPerson({ slug, name, kind, note }: MentorDraft): PersonConfig {
  const { defaultNote, ...preset } = mentorPresets[kind];

  return {
    slug,
    name,
    displayName: name,
    ...preset,
    note: {
      salutation: `Dear ${name},`,
      paragraphs: note ?? defaultNote,
    },
  };
}

export const people = mentorDrafts.map(createPerson);

validatePeople(people, siteConfig.journey);

export function getPersonBySlug(slug: string): PersonConfig | undefined {
  return people.find((person) => person.slug === slug);
}
