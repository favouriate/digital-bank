import { mockForgotPassword } from "../mocks/mock-forgot-password-service";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResult,
} from "../types/forgot-password";

export async function requestPasswordReset(
  request: ForgotPasswordRequest,
): Promise<ForgotPasswordResult> {
  return mockForgotPassword(request);
}
