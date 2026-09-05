import type { JourneyStage } from "./types";

export const siteConfig = {
  title: "Still With Me",
  subtitle: "For the people whose lessons didn't end when the class did.",
  siteUrl: "https://mentor.arverma.dev",
  author: {
    name: "Aman",
    fullName: "Aman Ranjan Verma",
    linkedinUrl: "https://www.linkedin.com/in/ar-verma",
  },
  occasion: "Happy Teacher's Day.",
  date: "September 2026",
  privacy: {
    noIndex: true,
    footer: "No tracking. No ads. Just a thank you.",
  },
  metadata: {
    description: "A small note of gratitude from Aman.",
    themeColorLight: "#f4f1ea",
    themeColorDark: "#171816",
  },
  openingThought: [
    "Some people teach a subject.",
    "Some teach a way of thinking.",
    "Some do both.",
  ],
  closing: [
    "Some lessons end with a class, course, or job.",
    "Some don't.",
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
