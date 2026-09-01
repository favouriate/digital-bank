import { mockUser } from "@/mocks/user";
import { recipientInitials } from "@/features/transfers/lib/format";
import {
  getDemoPin,
  PinError,
  resetDemoPin,
  setDemoPin,
} from "@/features/transfers/mocks/mock-transfer-service";
import { MOCK_TRANSFER_PIN } from "@/features/transfers/schemas/transfer-schema";

import { personalDetailsSchema } from "../schemas/personal-details-schema";
import type {
  ChangePasswordInput,
  ChangePinInput,
  Profile,
  ProfilePatch,
  SecurityFlagsPatch,
} from "../types/profile";
import {
  PasswordError,
  ProfileError,
  ProfileLoadError,
} from "../types/profile";

const DEMO_CURRENT_PASSWORD = "OpenPay!234";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function cloneProfile(profile: Profile): Profile {
  return {
    ...profile,
    account: { ...profile.account },
  };
}

function buildInitialProfile(): Profile {
  return {
    id: mockUser.id,
    name: mockUser.name,
    firstName: mockUser.firstName,
    initials: mockUser.initials,
    avatarUrl: mockUser.avatarUrl,
    email: "carla.rosser@example.com",
    phone: "+234 803 555 0142",
    dateOfBirth: "1992-06-12",
    nationality: "Nigerian",
    address: "18 Admiralty Way, Lekki, Lagos, Nigeria",
    verified: true,
    account: {
      status: "active",
      type: "Personal Savings",
      accountNumber: "200054215001",
      currency: "USD",
    },
    twoFactorEnabled: true,
    biometricEnabled: true,
  };
}

const INITIAL_PROFILE = buildInitialProfile();
let currentProfile: Profile = cloneProfile(INITIAL_PROFILE);

function syncShellUser(profile: Profile) {
  mockUser.name = profile.name;
  mockUser.firstName = profile.firstName;
  mockUser.initials = profile.initials;
  mockUser.avatarUrl = profile.avatarUrl;
}

function applyName(name: string) {
  const trimmed = name.trim();
  const firstName = trimmed.split(/\s+/).filter(Boolean)[0] ?? trimmed;

  currentProfile.name = trimmed;
  currentProfile.firstName = firstName;
  currentProfile.initials = recipientInitials(trimmed);
}

export async function mockGetProfile(options?: {
  failLoad?: boolean;
}): Promise<Profile> {
  await wait(450);

  if (options?.failLoad) {
    throw new ProfileLoadError();
  }

  return cloneProfile(currentProfile);
}

export async function mockUpdateProfile(patch: ProfilePatch): Promise<Profile> {
  await wait(450);

  const parsed = personalDetailsSchema.safeParse(patch);

  if (!parsed.success) {
    throw new ProfileError(parsed.error.issues[0]?.message);
  }

  applyName(parsed.data.name);
  currentProfile.email = parsed.data.email.toLowerCase();
  currentProfile.phone = parsed.data.phone;
  currentProfile.dateOfBirth = parsed.data.dateOfBirth;
  currentProfile.nationality = parsed.data.nationality;
  currentProfile.address = parsed.data.address;
  syncShellUser(currentProfile);

  return cloneProfile(currentProfile);
}

export async function mockUpdateSecurityFlags(
  patch: SecurityFlagsPatch,
): Promise<Profile> {
  await wait(450);

  if (typeof patch.twoFactorEnabled === "boolean") {
    currentProfile.twoFactorEnabled = patch.twoFactorEnabled;
  }

  if (typeof patch.biometricEnabled === "boolean") {
    currentProfile.biometricEnabled = patch.biometricEnabled;
  }

  return cloneProfile(currentProfile);
}

export async function mockChangePassword(
  input: ChangePasswordInput,
): Promise<void> {
  await wait(450);

  if (input.currentPassword !== DEMO_CURRENT_PASSWORD) {
    throw new PasswordError();
  }

  if (input.newPassword !== input.confirmPassword) {
    throw new ProfileError("Passwords do not match");
  }

  if (input.newPassword.length < 8) {
    throw new ProfileError("Password must be at least 8 characters");
  }
}

export async function mockChangePin(input: ChangePinInput): Promise<void> {
  await wait(450);

  if (input.currentPin !== getDemoPin()) {
    throw new PinError();
  }

  if (input.newPin !== input.confirmPin) {
    throw new ProfileError("PINs do not match");
  }

  if (!/^\d{4}$/.test(input.newPin)) {
    throw new ProfileError("Enter a 4-digit PIN");
  }

  setDemoPin(input.newPin);
}

export async function mockResetPin(): Promise<void> {
  await wait(450);
  setDemoPin(MOCK_TRANSFER_PIN);
}

export function resetProfileMocks() {
  currentProfile = cloneProfile(INITIAL_PROFILE);
  syncShellUser(currentProfile);
  resetDemoPin();
}
