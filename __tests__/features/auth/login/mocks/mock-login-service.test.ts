import { mockLogin } from "@/features/auth/login/mocks/mock-login-service";
import { mockUser } from "@/mocks/user";

describe("mockLogin", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the demo user for any email and password", async () => {
    const promise = mockLogin({
      email: "anyone@example.com",
      password: "whatever",
      rememberMe: false,
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toEqual({ userId: mockUser.id });
  });
});
