import type { PersonConfig } from "./types";
import { siteConfig } from "./site";
import { validatePeople } from "./validate";

export const people = [
  {
    slug: "meera-maam",
    name: "Meera Ma'am",
    displayName: "Meera Ma'am",
    category: "teacher",
    relationshipLabel: "School Teacher",
    stages: ["school"],
    chapters: [{ stage: "school", label: "Secondary school", period: "2007–2009" }],
    intro: { subtitle: "A small corner of the internet made to say thank you." },
    openingThought: {
      followUp: "Our paths crossed in a classroom. The habit of staying curious followed me far beyond it.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "School",
          title: "A classroom where questions were welcome",
          organization: "Northfield School",
          period: "2007 — 2009",
        },
      ],
    },
    whatStayed: {
      title: "Curiosity",
      description: [
        "You made asking one more question feel more important than arriving at an answer quickly.",
        "That instinct still appears whenever I am learning a new system or trying to understand why something behaves the way it does.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "A classroom where you made room for “why”." },
      now: { title: "I build software for a living, and I am still asking it." },
    },
    note: {
      salutation: "Dear Meera Ma'am,",
      paragraphs: [
        "I may not remember every page we covered, but I remember the patience with which you let an idea become clear.",
        "Thank you for showing me that careful thinking is worth the extra minute.",
      ],
    },
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  {
    slug: "professor-iyer",
    name: "Professor Iyer",
    displayName: "Professor Iyer",
    category: "professor",
    relationshipLabel: "Engineering Professor",
    stages: ["engineering"],
    chapters: [{ stage: "engineering", label: "Computer engineering", period: "2013–2017" }],
    intro: { eyebrow: "FOR", subtitle: "A note for one of the people whose lessons stayed." },
    openingThought: {
      followUp: "Our paths crossed while engineering was still mostly theory to me. Your standard for understanding stayed practical.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "Engineering",
          title: "Systems and algorithms",
          organization: "Meridian Institute of Technology",
          period: "2013 — 2017",
        },
      ],
    },
    whatStayed: {
      title: "Thinking clearly",
      description: [
        "You pushed us to explain a solution plainly before calling it complete.",
        "Years later, clarity is still the test I use for designs, reviews, and difficult engineering decisions.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "A whiteboard full of ideas that had to survive a simple question." },
      now: { title: "Complex systems still become manageable one clear explanation at a time." },
    },
    note: {
      salutation: "Professor Iyer,",
      paragraphs: [
        "Thank you for expecting precision without making uncertainty feel embarrassing.",
        "The combination of rigor and openness has influenced how I learn, and how I try to help others learn too.",
      ],
    },
    easterEgg: {
      enabled: true,
      type: "code",
      heading: "One last thing",
      lines: ["understand(idea)", "  before", "implement(idea)"],
    },
  },
  {
    slug: "dr-kavya-sen",
    name: "Dr. Kavya Sen",
    displayName: "Dr. Kavya Sen",
    category: "professor",
    relationshipLabel: "MBA Faculty",
    stages: ["mba"],
    chapters: [{ stage: "mba", label: "MBA", period: "2024–2026" }],
    intro: { subtitle: "Something thoughtful, for someone who changed how I frame a problem." },
    openingThought: {
      followUp: "Our paths crossed during the MBA. The questions you asked changed the angle from which I looked at decisions.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "MBA",
          title: "Strategy and decision-making",
          organization: "Westbridge School of Management",
          period: "2024 — 2026",
        },
      ],
    },
    whatStayed: {
      title: "Perspective",
      description: [
        "You taught me to pause before solving the problem in front of me and ask whether it was the right problem at all.",
        "That pause now travels with me into product conversations, engineering trade-offs, and decisions where the obvious answer is rarely the complete one.",
      ],
    },
    thenNow: { enabled: false, then: { title: "" }, now: { title: "" } },
    note: {
      salutation: "Dear Dr. Sen,",
      paragraphs: [
        "Your classes made disagreement feel like a tool for seeing more, not a contest to be won.",
        "Thank you for widening the frame. It has made my thinking more patient and my decisions more considered.",
      ],
      closing: "With gratitude,",
    },
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  {
    slug: "arjun-mentor",
    name: "Arjun",
    displayName: "Arjun",
    category: "mentor",
    relationshipLabel: "Career Mentor",
    stages: ["career"],
    chapters: [
      { stage: "career", label: "Harbor Labs", period: "2019–2021" },
      { stage: "career", label: "Juniper Works", period: "2021–2023" },
      { stage: "career", label: "The conversations after", period: "2023–Today" },
    ],
    intro: { subtitle: "A small corner of the internet made to say thank you." },
    openingThought: {
      followUp: "Our work changed, and the companies did too. Your example kept showing up in how I approached both.",
    },
    pathsCrossed: {
      entries: [
        { eyebrow: "First chapter", title: "My early years in engineering", organization: "Harbor Labs", period: "2019 — 2021" },
        { eyebrow: "Next chapter", title: "A broader kind of ownership", organization: "Juniper Works", period: "2021 — 2023" },
      ],
    },
    whatStayed: {
      title: "Ownership",
      description: [
        "You asked me to look beyond finishing the task and understand what needed to become true for the work to matter.",
        "That distinction still shapes how I design, communicate, and take responsibility when the path is not obvious.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "You asked me to stop thinking only about finishing the task." },
      now: { title: "Ownership is one of the principles I value most in engineering." },
    },
    note: {
      salutation: "Arjun,",
      paragraphs: [
        "You gave advice when it was useful, context when it was missing, and trust before I was completely sure I had earned it.",
        "Thank you for the example. It has stayed relevant through every change of role and team.",
      ],
    },
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
] satisfies PersonConfig[];

validatePeople(people, siteConfig.journey);

export function getPersonBySlug(slug: string): PersonConfig | undefined {
  return people.find((person) => person.slug === slug);
}
