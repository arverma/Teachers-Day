import type { PersonConfig } from "./types";
import { siteConfig } from "./site";
import { validatePeople } from "./validate";

type MentorKind =
  | "school-teacher"
  | "engineering-professor"
  | "mba-faculty"
  | "sigmoid-senior"
  | "flipkart-senior"
  | "quillbot-senior";

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
  { slug: "sigmoid-senior", name: "Senior at Sigmoid", kind: "sigmoid-senior" },
  { slug: "flipkart-senior", name: "Senior at Flipkart", kind: "flipkart-senior" },
  { slug: "quillbot-senior", name: "Senior at QuillBot", kind: "quillbot-senior" },
];

interface MentorPreset extends Omit<PersonConfig, "slug" | "name" | "displayName" | "note"> {
  defaultNote: string[];
}

interface CompanySeniorPreset {
  company: string;
  stage: "sigmoid" | "flipkart" | "quillbot";
  period: string;
  role: string;
  chapter: string;
  lesson: string;
  stayed: string[];
  then: string;
  now: string;
  note: string[];
}

function createCompanySeniorPreset({
  company,
  stage,
  period,
  role,
  chapter,
  lesson,
  stayed,
  then,
  now,
  note,
}: CompanySeniorPreset): MentorPreset {
  return {
    category: "mentor",
    relationshipLabel: `Senior at ${company}`,
    stages: [stage],
    chapters: [{ stage, label: `${role} · ${company}`, period }],
    intro: { eyebrow: "FOR", subtitle: `For someone whose guidance stayed with me beyond ${company}.` },
    openingThought: {
      followUp: `Our paths crossed at ${company}. What I learned from you continued into every chapter that followed.`,
    },
    pathsCrossed: {
      entries: [{ eyebrow: period, title: chapter, organization: company }],
    },
    whatStayed: { title: lesson, description: stayed },
    thenNow: {
      enabled: true,
      then: { title: then },
      now: { title: now },
    },
    defaultNote: note,
    easterEgg: {
      enabled: true,
      type: "git",
      heading: "One last thing",
      command: "git log --mentor",
      lines: [
        `Guidance received at ${company}.`,
        "Judgement improved.",
        "Lesson carried forward.",
        "",
        "Status: still in production.",
      ],
    },
  };
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
  "sigmoid-senior": createCompanySeniorPreset({
    company: "Sigmoid",
    stage: "sigmoid",
    period: "2019 - 2021",
    role: "Software Engineer I",
    chapter: "Learning to put data and machine-learning systems into production",
    lesson: "Practicality",
    stayed: [
      "You helped me understand the distance between code that works and a system that keeps working in production.",
      "That practical mindset became the foundation for every larger data platform I worked on afterward.",
    ],
    then: "An engineer building his first production data pipelines.",
    now: "A senior engineer still grounding ambitious architecture in operational reality.",
    note: [
      "Thank you for sharing the practical judgment that only comes from building and operating real systems.",
      "The habits I learned at Sigmoid stayed with me through every larger challenge that followed.",
    ],
  }),
  "flipkart-senior": createCompanySeniorPreset({
    company: "Flipkart",
    stage: "flipkart",
    period: "2021 - 2023",
    role: "Data Engineer II",
    chapter: "Taking ownership of financial data systems serving millions",
    lesson: "Ownership",
    stayed: [
      "You showed me that ownership means staying with a problem across technical, operational, and organizational boundaries.",
      "That lesson carried into migrations, cross-functional decisions, and the responsibility of maintaining continuity when teams changed.",
    ],
    then: "A data engineer stepping into larger systems and higher-stakes decisions.",
    now: "A senior engineer who treats continuity and accountability as part of the architecture.",
    note: [
      "Thank you for trusting me with consequential problems and showing me what end-to-end ownership looks like.",
      "The standard I saw at Flipkart continues to shape how I approach difficult work today.",
    ],
  }),
  "quillbot-senior": createCompanySeniorPreset({
    company: "QuillBot",
    stage: "quillbot",
    period: "2023 - Present",
    role: "Senior Data Engineer",
    chapter: "Architecting secure, petabyte-scale platforms and helping others grow",
    lesson: "Judgement",
    stayed: [
      "You helped me sharpen the judgment required to balance scale, security, cost, and the needs of the people using a system.",
      "That guidance influences how I make architectural decisions, document context, and mentor other engineers.",
    ],
    then: "An experienced engineer taking on broader architectural responsibility.",
    now: "A technical leader learning to multiply impact through systems, clarity, and people.",
    note: [
      "Thank you for offering context when the answer was not obvious and for making room for thoughtful technical disagreement.",
      "Your guidance continues to influence how I build, communicate, and support the engineers around me.",
    ],
  }),
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
