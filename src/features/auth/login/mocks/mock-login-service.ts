import { mockUser } from "@/mocks/user";

import { LoginError, type LoginCredentials, type LoginResult } from "../types/login";

export { LoginError };

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockLogin(
  _credentials: LoginCredentials,
): Promise<LoginResult> {
  await wait(450);

  return { userId: mockUser.id };
}
