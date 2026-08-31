import { mockForgotPassword } from "@/features/auth/forgot-password/mocks/mock-forgot-password-service";

describe("mockForgotPassword", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("always reports that a reset link was sent", async () => {
    const promise = mockForgotPassword({ email: "Ada@openpay.test" });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toEqual({ sent: true });
  });
});
