import { mockLogin } from "../mocks/mock-login-service";
import type { LoginCredentials, LoginResult } from "../types/login";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResult> {
  return mockLogin(credentials);
}
