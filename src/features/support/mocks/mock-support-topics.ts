import type { SupportTopic } from "../types/support";

export const MOCK_SUPPORT_TOPICS: SupportTopic[] = [
  {
    id: "faq-update-profile",
    category: "account",
    question: "How do I update my profile?",
    answer:
      "Open Settings, then Personal details, and choose Edit. You can update your name, email, phone number, date of birth, nationality, and address. Changes in this demo stay on this device.",
    keywords: ["profile", "personal details", "name", "account"],
  },
  {
    id: "faq-change-email-phone",
    category: "account",
    question: "How do I change my email or phone number?",
    answer:
      "Go to Settings → Personal details → Edit. Update the email or phone field and save. Use a number like +234 803 555 0142. Never send your password or PIN to confirm a change.",
    keywords: ["email", "phone", "number", "contact"],
  },
  {
    id: "faq-manage-profile",
    category: "account",
    question: "How do I manage my profile?",
    answer:
      "Settings is the place for profile, account information, security, PIN, theme, and notifications. The camera icon on your avatar is a demo control and does not upload a photo.",
    keywords: ["manage", "settings", "avatar", "photo"],
  },
  {
    id: "faq-transfer-pending",
    category: "payments",
    question: "Why is my transfer pending?",
    answer:
      "A pending transfer is still being processed. In this demo, some amounts stay pending without debiting your balance. Open Transactions to check status, or wait a few minutes and refresh.",
    keywords: ["pending", "transfer", "send money", "status"],
  },
  {
    id: "faq-transfer-failed",
    category: "payments",
    question: "What happens if a transfer fails?",
    answer:
      "If a transfer fails, the amount is not taken from your available balance. Review the recipient and amount, then try again. Contact support if it fails more than once — do not share your PIN.",
    keywords: ["failed", "failure", "transfer", "error"],
  },
  {
    id: "faq-transaction-reference",
    category: "payments",
    question: "Where can I find my transaction reference?",
    answer:
      "Open Transactions, then tap a row to see the details. The reference is listed on that page. You can include it when you contact support about a payment.",
    keywords: ["reference", "transaction", "find", "history"],
  },
  {
    id: "faq-change-password",
    category: "security",
    question: "How do I change my password?",
    answer:
      "Open Settings → Security settings → Login password. Enter your current password, then a new one. Never share your password, PIN, OTP, or card CVV with anyone, including messages that look like support.",
    keywords: ["password", "login", "security", "change"],
  },
  {
    id: "faq-reset-pin",
    category: "security",
    question: "How do I reset my transaction PIN?",
    answer:
      "Open Settings → Transaction PIN and choose Reset PIN. Reset restores the demo PIN used for Send Money. OpenPay staff will never ask you to type your PIN in chat or email.",
    keywords: ["pin", "transaction pin", "reset", "security"],
  },
  {
    id: "faq-two-factor",
    category: "security",
    question: "How do I enable two-factor authentication?",
    answer:
      "Go to Settings → Security settings and turn on Two-factor authentication. In this demo the switch is a flag only. Keep 2FA on for a real account, and never share one-time codes.",
    keywords: ["2fa", "two-factor", "authentication", "otp"],
  },
  {
    id: "faq-notification-preferences",
    category: "notifications",
    question: "How do I manage notification preferences?",
    answer:
      "Open Settings → Notification settings. You can turn transaction, security, bill, and promotional alerts on or off. These preferences stay on this device in the demo.",
    keywords: ["notification", "alerts", "preferences", "manage"],
  },
  {
    id: "faq-promotional-off",
    category: "notifications",
    question: "How do I turn promotional notifications off?",
    answer:
      "Go to Settings → Notification settings and switch off Promotional notifications. Transaction and security alerts can stay on so you still hear about account activity.",
    keywords: ["promotional", "offers", "marketing", "off"],
  },
  {
    id: "faq-missing-alert",
    category: "notifications",
    question: "Why didn't I receive a transaction alert?",
    answer:
      "Check Settings → Notification settings and confirm Transaction alerts are on. If they are on and you still miss an update, look in Transactions for the latest status, then contact support.",
    keywords: ["alert", "notification", "security", "not receiving"],
  },
];
