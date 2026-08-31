import { LoginError, mockLogin } from "@/features/auth/login/mocks/mock-login-service";
import { mockUser } from "@/mocks/user";

describe("mockLogin", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the demo user for the known password", async () => {
    const promise = mockLogin({
      email: "Ada@openpay.test",
      password: "OpenPay!234",
      rememberMe: false,
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toEqual({ userId: mockUser.id });
  });

  it("rejects an incorrect password", async () => {
    const promise = mockLogin({
      email: "ada@openpay.test",
      password: "wrong-password",
      rememberMe: false,
    });

    const assertion = expect(promise).rejects.toBeInstanceOf(LoginError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });
});
