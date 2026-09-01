import {
  mockChangePassword,
  mockChangePin,
  mockGetProfile,
  mockResetPin,
  mockUpdateProfile,
  mockUpdateSecurityFlags,
} from "../mocks/mock-profile-service";
import type {
  ChangePasswordInput,
  ChangePinInput,
  Profile,
  ProfilePatch,
  SecurityFlagsPatch,
} from "../types/profile";

export async function getProfile(options?: {
  failLoad?: boolean;
}): Promise<Profile> {
  return mockGetProfile(options);
}

export async function updateProfile(patch: ProfilePatch): Promise<Profile> {
  return mockUpdateProfile(patch);
}

export async function updateSecurityFlags(
  patch: SecurityFlagsPatch,
): Promise<Profile> {
  return mockUpdateSecurityFlags(patch);
}

export async function changePassword(
  input: ChangePasswordInput,
): Promise<void> {
  return mockChangePassword(input);
}

export async function changePin(input: ChangePinInput): Promise<void> {
  return mockChangePin(input);
}

export async function resetPin(): Promise<void> {
  return mockResetPin();
}
