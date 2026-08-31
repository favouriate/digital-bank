import { mockUser } from "@/mocks/user";

import { LoginError, type LoginCredentials, type LoginResult } from "../types/login";

export { LoginError };

const DEMO_PASSWORD = "OpenPay!234";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockLogin(
  credentials: LoginCredentials,
): Promise<LoginResult> {
  await wait(450);

  const email = credentials.email.trim().toLowerCase();
  const isValidDemoLogin =
    zEmail(email) && credentials.password === DEMO_PASSWORD;

  if (!isValidDemoLogin) {
    throw new LoginError();
  }

  return { userId: mockUser.id };
}

function zEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
