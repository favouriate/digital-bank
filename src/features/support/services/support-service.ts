import {
  mockCreateSupportRequest,
  mockGetSupportTopics,
} from "../mocks/mock-support-service";
import type {
  CreateSupportRequestInput,
  SupportRequestResult,
  SupportTopic,
} from "../types/support";

export async function getSupportTopics(options?: {
  failLoad?: boolean;
}): Promise<SupportTopic[]> {
  return mockGetSupportTopics(options);
}

export async function createSupportRequest(
  input: CreateSupportRequestInput,
): Promise<SupportRequestResult> {
  return mockCreateSupportRequest(input);
}
