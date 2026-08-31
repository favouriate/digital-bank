import { RegisterError, mockRegister } from "@/features/auth/register/mocks/mock-register-service";

describe("mockRegister", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("creates an account after the mock delay", async () => {
    const promise = mockRegister({
      email: "Ada@openpay.test",
      password: "password1",
      acceptedTerms: true,
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toEqual({ userId: "user-ada-openpay-test" });
  });

  it("rejects a taken email", async () => {
    const promise = mockRegister({
      email: "taken@openpay.test",
      password: "password1",
      acceptedTerms: true,
    });

    const assertion = expect(promise).rejects.toMatchObject({
      name: "RegisterError",
      message: "An account with this email already exists.",
    });

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
    await expect(promise).rejects.toBeInstanceOf(RegisterError);
  });
});
