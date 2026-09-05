import { siteConfig } from "../data/site";
import type { PersonConfig } from "../data/types";

const studentCategories = new Set<PersonConfig["category"]>([
  "teacher",
  "professor",
  "engineering-admin",
]);

export function createWhatsAppShareUrl(person: PersonConfig): string {
  const relationship = studentCategories.has(person.category) ? "my student Aman" : "Aman";
  const message = [
    `Look what ${relationship} has built to thank me on Teacher's Day.`,
    "This thoughtful little corner of the internet made my day. 🌱",
    "",
    `${siteConfig.siteUrl}/thankyou/${person.slug}/`,
  ].join("\n");

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
