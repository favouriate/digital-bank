import type {
  ForgotPasswordRequest,
  ForgotPasswordResult,
} from "../types/forgot-password";

export { ForgotPasswordError } from "../types/forgot-password";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockForgotPassword(
  _request: ForgotPasswordRequest,
): Promise<ForgotPasswordResult> {
  await wait(450);

  return { sent: true };
}
