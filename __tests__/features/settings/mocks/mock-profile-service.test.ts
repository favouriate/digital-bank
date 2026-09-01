import { mockUser } from "@/mocks/user";
import {
  getDemoPin,
  mockVerifyPin,
  PinError,
  resetTransferMocks,
} from "@/features/transfers/mocks/mock-transfer-service";
import { MOCK_TRANSFER_PIN } from "@/features/transfers/schemas/transfer-schema";
import {
  mockChangePassword,
  mockChangePin,
  mockGetProfile,
  mockResetPin,
  mockUpdateProfile,
  resetProfileMocks,
} from "@/features/settings/mocks/mock-profile-service";
import { PasswordError, ProfileError } from "@/features/settings/types/profile";

describe("mock profile service", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetProfileMocks();
    resetTransferMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    resetProfileMocks();
    resetTransferMocks();
  });

  it("returns Carla Rosser, not Astrid Hayes", async () => {
    const promise = mockGetProfile();
    await jest.advanceTimersByTimeAsync(450);
    const profile = await promise;

    expect(profile.id).toBe("user-carla-rosser");
    expect(profile.name).toBe("Carla Rosser");
    expect(profile.email).toBe("carla.rosser@example.com");
    expect(profile.email).not.toContain("astrid");
    expect(profile.account.currency).toBe("USD");
    expect(profile.account.accountNumber).toBe("200054215001");
    expect(profile.verified).toBe(true);
  });

  it("throws for the demo load-error flag", async () => {
    const promise = mockGetProfile({ failLoad: true });
    const assertion = expect(promise).rejects.toBeInstanceOf(
      (await import("@/features/settings/types/profile")).ProfileLoadError,
    );

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });

  it("updates personal details and syncs the shell user", async () => {
    const promise = mockUpdateProfile({
      name: "Carla Rosser",
      email: "carla.rosser@openpay.test",
      phone: "+234 803 555 0142",
      dateOfBirth: "1992-06-12",
      nationality: "Nigerian",
      address: "18 Admiralty Way, Lekki, Lagos, Nigeria",
    });

    await jest.advanceTimersByTimeAsync(450);
    const profile = await promise;

    expect(profile.email).toBe("carla.rosser@openpay.test");
    expect(mockUser.name).toBe("Carla Rosser");
    expect(mockUser.initials).toBe("CR");
  });

  it("rejects invalid personal details", async () => {
    const promise = mockUpdateProfile({
      name: "C",
      email: "not-an-email",
      phone: "0803",
      dateOfBirth: "2099-01-01",
      nationality: "Nigerian",
      address: "Lagos",
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(ProfileError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });

  it("does not store a changed password", async () => {
    const promise = mockChangePassword({
      currentPassword: "OpenPay!234",
      newPassword: "NewPass!234",
      confirmPassword: "NewPass!234",
    });

    await jest.advanceTimersByTimeAsync(450);
    await expect(promise).resolves.toBeUndefined();

    const again = mockChangePassword({
      currentPassword: "NewPass!234",
      newPassword: "OtherPass!234",
      confirmPassword: "OtherPass!234",
    });
    const assertion = expect(again).rejects.toBeInstanceOf(PasswordError);
    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });

  it("updates the in-memory PIN used by transfer verification", async () => {
    const change = mockChangePin({
      currentPin: MOCK_TRANSFER_PIN,
      newPin: "4321",
      confirmPin: "4321",
    });
    await jest.advanceTimersByTimeAsync(450);
    await change;

    expect(getDemoPin()).toBe("4321");

    const verify = mockVerifyPin("4321");
    await jest.advanceTimersByTimeAsync(450);
    await expect(verify).resolves.toBeUndefined();

    const reject = mockVerifyPin(MOCK_TRANSFER_PIN);
    const assertion = expect(reject).rejects.toBeInstanceOf(PinError);
    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });

  it("resets the demo PIN to the default", async () => {
    const change = mockChangePin({
      currentPin: MOCK_TRANSFER_PIN,
      newPin: "9999",
      confirmPin: "9999",
    });
    await jest.advanceTimersByTimeAsync(450);
    await change;

    const reset = mockResetPin();
    await jest.advanceTimersByTimeAsync(450);
    await reset;

    expect(getDemoPin()).toBe(MOCK_TRANSFER_PIN);
  });
});
