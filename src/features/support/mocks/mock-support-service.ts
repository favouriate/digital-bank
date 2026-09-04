import { contactSupportSchema } from "../schemas/contact-schema";
import type {
  CreateSupportRequestInput,
  SupportRequestResult,
  SupportTopic,
} from "../types/support";
import { SupportLoadError, SupportRequestError } from "../types/support";

import { MOCK_SUPPORT_TOPICS } from "./mock-support-topics";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let nextRequestNumber = 1;

function formatReference(sequence: number) {
  return `SUP-2026-${String(sequence).padStart(3, "0")}`;
}

export async function mockGetSupportTopics(options?: {
  failLoad?: boolean;
}): Promise<SupportTopic[]> {
  await wait(450);

  if (options?.failLoad) {
    throw new SupportLoadError();
  }

  return MOCK_SUPPORT_TOPICS.map((topic) => ({
    ...topic,
    keywords: [...topic.keywords],
  }));
}

export async function mockCreateSupportRequest(
  input: CreateSupportRequestInput,
): Promise<SupportRequestResult> {
  await wait(450);

  const parsed = contactSupportSchema.safeParse(input);

  if (!parsed.success) {
    throw new SupportRequestError(parsed.error.issues[0]?.message);
  }

  const reference = formatReference(nextRequestNumber);
  nextRequestNumber += 1;

  return { reference };
}

export function resetSupportMocks() {
  nextRequestNumber = 1;
}
