import { describe, expect, it } from "vitest";

import type { PersonConfig } from "../data/types";
import { createShareData, createWhatsAppShareUrl } from "./share";

const person = (category: PersonConfig["category"]): PersonConfig =>
  ({ category, slug: "khalid-kareem-khan" }) as PersonConfig;

describe("WhatsApp sharing", () => {
  it("describes Aman as the recipient's student on education pages", () => {
    const url = createWhatsAppShareUrl(person("teacher"));
    const message = new URL(url).searchParams.get("text");

    expect(message).toContain("my student Aman");
    expect(message).toContain("Teacher's Day");
    expect(message).toContain(
      "https://mentor.arverma.dev/thankyou/khalid-kareem-khan/",
    );
  });

  it("does not call Aman a student on a company mentor page", () => {
    const url = createWhatsAppShareUrl(person("mentor"));
    const message = new URL(url).searchParams.get("text");

    expect(message).toContain("Look what Aman has built");
    expect(message).not.toContain("my student");
  });

  it("provides separate text and URL for the phone's native share sheet", () => {
    expect(createShareData(person("teacher"))).toEqual({
      title: "A thank-you note from Aman",
      text: expect.stringContaining("my student Aman"),
      url: "https://mentor.arverma.dev/thankyou/khalid-kareem-khan/",
    });
  });
});
