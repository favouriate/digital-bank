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
    let settled = false;
    void promise.then(() => {
      settled = true;
    });

    await jest.advanceTimersByTimeAsync(999);
    expect(settled).toBe(false);
    await jest.advanceTimersByTimeAsync(1);

    await expect(promise).resolves.toEqual({ userId: mockUser.id });
  });
});
