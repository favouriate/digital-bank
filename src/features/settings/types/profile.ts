export type AccountStatus = "active";

export type ProfileAccount = {
  status: AccountStatus;
  type: string;
  accountNumber: string;
  currency: "USD";
};

export type Profile = {
  id: string;
  name: string;
  firstName: string;
  initials: string;
  avatarUrl: string | null;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  verified: boolean;
  account: ProfileAccount;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
};

export type ProfilePatch = {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
};

export type SecurityFlagsPatch = {
  twoFactorEnabled?: boolean;
  biometricEnabled?: boolean;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePinInput = {
  currentPin: string;
  newPin: string;
  confirmPin: string;
};

export class ProfileError extends Error {
  constructor(message = "We couldn't update your profile. Please try again.") {
    super(message);
    this.name = "ProfileError";
  }
}

export class ProfileLoadError extends Error {
  constructor(message = "We couldn't load your profile.") {
    super(message);
    this.name = "ProfileLoadError";
  }
}

export class PasswordError extends Error {
  constructor(message = "That password is incorrect. Please try again.") {
    super(message);
    this.name = "PasswordError";
  }
}
