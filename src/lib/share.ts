import { siteConfig } from "../data/site";
import type { PersonConfig } from "../data/types";

const studentCategories = new Set<PersonConfig["category"]>([
  "teacher",
  "professor",
  "engineering-admin",
]);

export function createShareData(person: PersonConfig) {
  const relationship = studentCategories.has(person.category) ? "my student Aman" : "Aman";
  return {
    title: "A thank-you note from Aman",
    text: [
      `Look what ${relationship} has built to thank me on Teacher's Day.`,
      "This thoughtful little corner of the internet made my day. 🌱",
    ].join("\n"),
    url: `${siteConfig.siteUrl}/thankyou/${person.slug}/`,
  };
}

export function createWhatsAppShareUrl(person: PersonConfig): string {
  const { text, url } = createShareData(person);
  const message = `${text}\n\n${url}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
