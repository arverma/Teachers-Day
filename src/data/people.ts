import type { PersonConfig } from "./types";
import { siteConfig } from "./site";
import { validatePeople } from "./validate";

type MentorKind =
  | "school-teacher"
  | "engineering-professor"
  | "engineering-admin"
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
  { slug: "khalid-kareem-khan", name: "Khalid Kareem Khan", kind: "school-teacher" },
  { slug: "dr-nagesh-ch", name: "Dr. Nagesh Ch", kind: "engineering-professor" },
  { slug: "dr-navanath-saharia", name: "Dr. Navanath Saharia", kind: "engineering-professor" },
  { slug: "dr-nongmeikapam-kishorjit-singh", name: "Dr. Nongmeikapam Kishorjit Singh", kind: "engineering-professor" },
  { slug: "dr-ramesh-ch-mishra", name: "Dr. Ramesh Ch. Mishra", kind: "engineering-professor" },
  { slug: "dr-subasit-borah", name: "Dr. Subasit Borah", kind: "engineering-professor" },
  { slug: "dr-bhargab-deka", name: "Dr. BHARGAB DEKA", kind: "engineering-professor" },
  { slug: "dr-amarendra-kumar-das", name: "Dr. Amarendra Kumar Das", kind: "engineering-professor" },
  { slug: "dr-kishore-kumar-das", name: "Dr. Kishore Kumar Das", kind: "engineering-professor" },
  { slug: "dr-murli-manohar-kumar", name: "Dr. Murli Manohar Kumar", kind: "engineering-professor" },
  { slug: "dr-leihaorambam-sarbajit-singh", name: "Dr. Leihaorambam Sarbajit Singh", kind: "engineering-professor" },
  { slug: "dr-sanjib-choudhury", name: "Dr. Sanjib Choudhury", kind: "engineering-professor" },
  { slug: "mr-chingangbam-collin-singh", name: "Mr. Chingangbam Collin Singh", kind: "engineering-admin" },
  { slug: "salam-monorama-devi", name: "Salam Monorama Devi", kind: "engineering-admin" },
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
    intro: { eyebrow: "FOR", subtitle: `A small thank you for everything I learned from you at ${company}.` },
    openingThought: {
      followUp: `I worked with you at ${company}. I still use many of the things I learned from you there.`,
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
        `Asked for help at ${company}.`,
        "Got patient guidance.",
        "Still using it today.",
        "",
        "Status: grateful.",
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
    intro: { subtitle: "I wanted to take a moment and say thank you." },
    openingThought: {
      followUp:
        "You knew me before all the degrees and job titles. A lot of the confidence I have today started in classrooms like yours.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "School",
          title: "Where my learning really started",
          organization: "MS Memorial Academy",
          period: "School years",
          description:
            "This was long before engineering and my career, but the things I learned here gave me a strong start.",
        },
      ],
    },
    whatStayed: {
      title: "Curiosity",
      description: [
        "You made me feel that asking one more question was a good thing. That habit became a part of how I learn and solve problems.",
        "It stayed with me through school, IIIT Manipur, and all the years I have spent working as an engineer.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "I was a student who was slowly becoming more comfortable asking questions." },
      now: { title: "Today, I am a senior data engineer who still starts by asking why." },
    },
    defaultNote: [
      "I may not remember every chapter you taught me, but I remember the confidence and patience you gave me.",
      "Thank you for being part of my early journey. A lot of what came later was built on that foundation.",
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
    intro: { eyebrow: "FOR", subtitle: "A small thank you for the lessons I still carry with me." },
    openingThought: {
      followUp:
        "I met you at IIIT Manipur when I was still learning what it really means to think like an engineer.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "Engineering",
          title: "A classroom where I could ask questions",
          organization: "IIIT Senapati, Manipur",
          period: "2015 - 2019",
          description:
            "I studied Electronics and Communication Engineering here, graduated with a 9.13 CPI, and received the gold medal.",
        },
      ],
    },
    whatStayed: {
      title: "Clarity",
      description: [
        "You taught me not to stop at an answer just because it looked right. I had to understand why it was right.",
        "I still follow that lesson when I design systems, review someone else's work, or explain a difficult idea to my team.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "I was an ECE student trying to understand things properly." },
      now: {
        title: "Today, I build large data systems and serve on IIIT Manipur's Board of Studies. I still try to be just as clear.",
      },
    },
    defaultNote: [
      "Thank you for pushing me to understand things properly while still making it comfortable to ask questions.",
      "At that time, I may not have realised how useful this would be. I see it now in the way I work and in the way I help other engineers.",
    ],
    easterEgg: {
      enabled: true,
      type: "code",
      heading: "One last thing",
      lines: ["understand(idea)", "  before", "implement(idea)"],
    },
  },
  "engineering-admin": {
    category: "engineering-admin",
    relationshipLabel: "Engineering Administration",
    stages: ["engineering"],
    chapters: [
      {
        stage: "engineering",
        label: "Electronics & Communication Engineering",
        period: "2015 - 2019",
      },
    ],
    intro: { subtitle: "A small thank you for the support you gave me during my college years." },
    openingThought: {
      followUp:
        "Not every important lesson came from a classroom. Some came from people who helped students whenever they needed support.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "Engineering",
          title: "Support that mattered outside the classroom",
          organization: "IIIT Senapati, Manipur",
          period: "2015 - 2019",
          description:
            "These four years gave me many memories, and the people who helped things run smoothly were an important part of them.",
        },
      ],
    },
    whatStayed: {
      title: "Support",
      description: [
        "College can feel confusing at times. Having someone who listens, guides, and helps with patience makes a real difference.",
        "I still remember that support with a lot of respect and gratitude.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "I was a student trying to find my way through engineering and college life." },
      now: { title: "Today, I still remember the people who made that journey a little easier." },
    },
    defaultNote: [
      "Thank you for helping me during my time at IIIT Manipur and for always treating students with patience.",
      "Your support may have felt like part of your everyday work, but it mattered to me and I still remember it.",
    ],
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  "mba-faculty": {
    category: "professor",
    relationshipLabel: "MBA Faculty",
    stages: ["mba"],
    chapters: [{ stage: "mba", label: "MBA", period: "2025 - 2027" }],
    intro: { subtitle: "A small thank you for helping me look at problems differently." },
    openingThought: {
      followUp:
        "I met you at IIM Bodh Gaya after I had already spent years working as an engineer. You helped me look beyond only the technical side.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "MBA",
          title: "Learning to see the bigger picture",
          organization: "IIM Bodh Gaya",
          period: "2025 - 2027",
          description:
            "I am doing my MBA while continuing my work in data engineering. This chapter is helping me connect technology with people and business.",
        },
      ],
    },
    whatStayed: {
      title: "The bigger picture",
      description: [
        "Your questions made me think beyond how something works. I started asking why I am doing it and who it will help.",
        "I now carry that thinking into technical decisions, conversations with other teams, and the way I lead work.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "I was an engineer mostly thinking about correctness and scale." },
      now: { title: "Now, I am also learning to think about people, strategy, and long-term value." },
    },
    defaultNote: [
      "Thank you for helping me see familiar problems from a different angle.",
      "I am already using these lessons in the way I communicate, make decisions, and work with people outside engineering.",
    ],
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  "sigmoid-senior": createCompanySeniorPreset({
    company: "Sigmoid",
    stage: "sigmoid",
    period: "2019 - 2021",
    role: "Software Engineer I",
    chapter: "Learning how real production systems work",
    lesson: "Being practical",
    stayed: [
      "You helped me understand that writing working code is only the first step. A real system also has to be reliable and easy for others to operate.",
      "I carried this practical way of thinking with me when I moved on to much larger data platforms.",
    ],
    then: "I was an engineer building my first production data pipelines.",
    now: "Today, I still check whether a big technical idea will actually work well in production.",
    note: [
      "Thank you for patiently sharing what you had learned from working on real systems.",
      "The habits I picked up at Sigmoid stayed with me and helped me handle every bigger challenge that came later.",
    ],
  }),
  "flipkart-senior": createCompanySeniorPreset({
    company: "Flipkart",
    stage: "flipkart",
    period: "2021 - 2023",
    role: "Data Engineer II",
    chapter: "Learning to take ownership of systems used by millions",
    lesson: "Ownership",
    stayed: [
      "You showed me that ownership means staying with a problem until it is properly solved, even when it involves many teams.",
      "I carried that lesson into migrations, difficult decisions, and times when the team was going through a lot of change.",
    ],
    then: "I was a data engineer taking responsibility for larger and more important systems.",
    now: "Today, I know that being dependable is just as important as being technically strong.",
    note: [
      "Thank you for trusting me with important problems and showing me what real ownership looks like.",
      "I still remember that standard from Flipkart whenever I take on difficult work today.",
    ],
  }),
  "quillbot-senior": createCompanySeniorPreset({
    company: "QuillBot",
    stage: "quillbot",
    period: "2023 - Present",
    role: "Senior Data Engineer",
    chapter: "Building large data platforms and helping other engineers grow",
    lesson: "Making better decisions",
    stayed: [
      "You helped me think calmly when there was no perfect answer and I had to balance scale, security, cost, and people's needs.",
      "I use that guidance when I make difficult technical decisions, write down context, or help another engineer through a problem.",
    ],
    then: "I was an experienced engineer starting to take on bigger technical decisions.",
    now: "Today, I am learning that my work is also about helping the people around me do well.",
    note: [
      "Thank you for giving me context when the answer was not obvious and for always making room for an honest discussion.",
      "Your guidance still helps me in the way I build, communicate, and support the engineers around me.",
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
