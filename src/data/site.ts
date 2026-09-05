import type { JourneyStage } from "./types";

export const siteConfig = {
  title: "Still With Me",
  subtitle: "A simple thank you to the people whose lessons are still with me.",
  siteUrl: "https://mentor.arverma.dev",
  author: {
    name: "Aman",
    fullName: "Aman Ranjan Verma",
    linkedinUrl: "https://www.linkedin.com/in/ar-verma",
  },
  occasion: "Thank you, and Happy Teacher's Day.",
  date: "September 2026",
  privacy: {
    noIndex: true,
    footer: "No tracking. No ads. Just a thank you.",
  },
  metadata: {
    description: "A personal thank-you note from Aman.",
    themeColorLight: "#f4f1ea",
    themeColorDark: "#171816",
  },
  openingThought: [
    "Some people teach you a subject.",
    "Some people change how you think.",
    "Those lessons stay with you.",
  ],
  closing: [
    "The class, course, or job may end.",
    "The learning stays.",
  ],
  journey: [
    { id: "school", label: "School" },
    { id: "engineering", label: "IIIT Manipur" },
    { id: "sigmoid", label: "Sigmoid" },
    { id: "flipkart", label: "Flipkart" },
    { id: "quillbot", label: "QuillBot" },
    { id: "mba", label: "IIM Bodh Gaya" },
    { id: "today", label: "Today" },
  ] satisfies JourneyStage[],
} as const;
