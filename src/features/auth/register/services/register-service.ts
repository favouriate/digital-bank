import { mockRegister } from "../mocks/mock-register-service";
import type { RegisterCredentials, RegisterResult } from "../types/register";

export async function register(
  credentials: RegisterCredentials,
): Promise<RegisterResult> {
  return mockRegister(credentials);
}
