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
  { slug: "ishaan-ojha", name: "Ishan Ojha", kind: "sigmoid-senior" },
  { slug: "karthik-nandam", name: "Karthik Nandam", kind: "sigmoid-senior" },
  { slug: "pradyot-h-adavi", name: "Pradyot H. Adavi", kind: "flipkart-senior" },
  { slug: "rafi-quillbot", name: "Rafi", kind: "quillbot-senior" },
  { slug: "muhammad-rafi-quillbot", name: "Muhammad Rafi", kind: "quillbot-senior" },
  { slug: "jayant-quillbot", name: "Jayant", kind: "quillbot-senior" },
  { slug: "aditya-malik-quillbot", name: "Aditya Malik", kind: "quillbot-senior" },
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
  memory?: string;
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
  memory,
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
      entries: [{ eyebrow: period, title: chapter, organization: company, description: memory }],
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
            "Studies are not the only thing I remember. I remember the morning classes, extra classes, solving problems together, standing in queues, discussing topics in the classroom even when no teacher was there, games periods, and the Saturday quiz. These ordinary moments are what make my school memories special.",
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
            "Studies were only one part of those four years. What I remember most now is the lovely weather, the hill beside the college, time with faculty and friends, dinners with other students, the daily mess rush, and even the water problems. These everyday moments made Manipur special.",
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
        title: "Today, I build large data systems, and I still try to understand things with the same clarity.",
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
            "Studies were only one part of those four years. What I remember most now is the lovely weather, the hill beside the college, time with faculty and friends, dinners with other students, the daily mess rush, and even the water problems. These everyday moments made Manipur special.",
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
    intro: { subtitle: "A small thank you for making the first immersion so memorable." },
    openingThought: {
      followUp:
        "I still remember the interactions during the very first immersion. It was the beginning of a new kind of learning for me, and you made it feel welcoming from the start.",
    },
    pathsCrossed: {
      entries: [
        {
          eyebrow: "MBA",
          title: "The first immersion, on campus and online",
          organization: "IIM Bodh Gaya",
          period: "2025 - 2027",
          description:
            "I remember the games, the classroom discussions, and the conversations in the online forum. I also remember you eagerly waiting to see student faces while everyone played a little hide and seek with their cameras.",
        },
      ],
    },
    whatStayed: {
      title: "Showing up",
      description: [
        "There have been morning classes, late-night classes, and back-to-back exams, all while managing work pressure at the same time.",
        "It has not always been easy, but I hope this effort will become meaningful and open better paths later in my career.",
      ],
    },
    thenNow: {
      enabled: true,
      then: { title: "I joined the first immersion curious about what this new chapter would bring." },
      now: { title: "Now, I am learning to make space for study even when work and life are already full." },
    },
    defaultNote: [
      "Thank you for making the first immersion lively, warm, and worth remembering.",
      "The games, discussions, long classes, and small online moments made the pressure easier to carry. I hope I will look back and see how much this journey shaped my career.",
    ],
    easterEgg: { enabled: false, type: "quote", lines: [] },
  },
  "sigmoid-senior": createCompanySeniorPreset({
    company: "Sigmoid",
    stage: "sigmoid",
    period: "2019 - 2021",
    role: "Software Engineer I",
    chapter: "Learning how real production systems work",
    memory:
      "I remember the lunch walks, evening tea, lunches, and the occasional dinner. Friday evenings often meant badminton or cricket. Those simple breaks made a demanding first job feel lighter and gave me space to learn from you beyond project meetings.",
    lesson: "Learning widely",
    stayed: [
      "As a fresher, I worked on several short projects. You helped me gather a breadth of knowledge in that small span of time instead of seeing each task in isolation.",
      "That learning and mentorship still help me today when I design data systems at a much larger scale.",
    ],
    then: "I was a fresher learning from every short project that came my way.",
    now: "Today, those early lessons still guide me while I design some of the largest data systems I have worked on.",
    note: [
      "Thank you for the time, conversations, and mentorship you gave me during those early years at Sigmoid.",
      "If I become a manager or mentor someday, I hope I can give people the same trust, patience, and support you gave me.",
      "I hope I get the chance to work with you again, this time on larger data problems together.",
    ],
  }),
  "flipkart-senior": createCompanySeniorPreset({
    company: "Flipkart",
    stage: "flipkart",
    period: "2021 - 2023",
    role: "Data Engineer II",
    chapter: "Building data products for BNPL and user scoring",
    memory:
      "I worked closely with Axis on BNPL products and built data products for scoring users at Flipkart. You gave me a free hand to own the work while still being there with support and advice whenever I needed it.",
    lesson: "Trust with support",
    stayed: [
      "I felt independent and supported at the same time while working on these data products. That balance helped me take real ownership without ever feeling that I was on my own.",
      "Even though I worked with you for a short time, I learned what it means to give developers a free hand while still offering mentorship and honest advice.",
    ],
    then: "I was learning to take independent ownership of data products used for important decisions.",
    now: "Today, I still value the same balance of freedom, support, and responsibility in every team I work with.",
    note: [
      "Thank you for trusting me with the Axis BNPL work and the data products used for scoring users. Your support gave me the confidence to take ownership and solve problems independently.",
      "The time was short, but the learning stayed with me.",
      "If I become a manager someday, I would like to give my team the same freedom, support, mentorship, and advice that you gave me.",
    ],
  }),
  "quillbot-senior": createCompanySeniorPreset({
    company: "QuillBot",
    stage: "quillbot",
    period: "2023 - Present",
    role: "Senior Data Engineer",
    chapter: "Building large data platforms with a team I will always remember",
    memory:
      "I remember the offsites, the fun, long discussions, games, time sitting on the beach, lunches, dinners, and all the plans the group made. The bond felt rare, and some of the best time in my seven years in the industry was spent with this team.",
    lesson: "People and scale",
    stayed: [
      "I had never built platforms at this scale before. Working with you gave me the confidence that I can understand large problems and build systems that handle them well.",
      "Your advice, career guidance, and the opportunities you gave me to learn have shaped both my work and the way I think about my career.",
    ],
    then: "I joined ready to take on bigger technical problems, without knowing how special the people around me would become.",
    now: "Today, I carry both the platform-building experience and the memories of a team that made work feel special.",
    note: [
      "Thank you for the offsites, the discussions, the games, the beach time, the lunches and dinners, and all the plans that made those days so much fun.",
      "The bond in that group was on another level. Some of the best time in my seven-year career was spent with you all, and offsites have never felt the same since.",
      "I am also grateful for everything I learned while building platforms at a scale I had never worked with before. Your advice, career guidance, and the opportunities you gave me to learn will stay with me for a long time.",
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
