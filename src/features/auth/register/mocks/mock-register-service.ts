import { RegisterError, type RegisterCredentials, type RegisterResult } from "../types/register";

export { RegisterError };

const TAKEN_EMAIL = "taken@openpay.test";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockRegister(
  credentials: RegisterCredentials,
): Promise<RegisterResult> {
  await wait(450);

  const email = credentials.email.trim().toLowerCase();

  if (email === TAKEN_EMAIL) {
    throw new RegisterError("An account with this email already exists.");
  }

  return { userId: `user-${email.replace(/[^a-z0-9]+/g, "-")}` };
}
