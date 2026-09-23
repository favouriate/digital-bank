export const SUPPORT_CATEGORY_IDS = [
  "account",
  "payments",
  "security",
  "notifications",
] as const;

export type SupportCategoryId = (typeof SUPPORT_CATEGORY_IDS)[number];

export function isSupportCategoryId(
  value: string,
): value is SupportCategoryId {
  return SUPPORT_CATEGORY_IDS.includes(value as SupportCategoryId);
}

export type SupportTopic = {
  id: string;
  category: SupportCategoryId;
  question: string;
  answer: string;
  keywords: string[];
};

export type CreateSupportRequestInput = {
  category: SupportCategoryId;
  subject: string;
  message: string;
  transactionReference?: string;
};

export type SupportRequestResult = {
  reference: string;
};

export class SupportLoadError extends Error {
  constructor(message = "We couldn't load help topics.") {
    super(message);
    this.name = "SupportLoadError";
  }
}

export class SupportRequestError extends Error {
  constructor(
    message = "We couldn't submit your support request. Please try again.",
  ) {
    super(message);
    this.name = "SupportRequestError";
  }
}
