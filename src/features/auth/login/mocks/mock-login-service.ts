import { mockUser } from "@/mocks/user";

import { LoginError, type LoginCredentials, type LoginResult } from "../types/login";

export { LoginError };

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockLogin(
  credentials: LoginCredentials,
): Promise<LoginResult> {
  void credentials;
  await wait(1_000);

  return { userId: mockUser.id };
}
