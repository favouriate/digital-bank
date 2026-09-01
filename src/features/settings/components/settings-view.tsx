"use client";

import { useState } from "react";

import { useThemePreference } from "@/features/auth/login/components/theme-toggle";
import { PinError } from "@/features/transfers/types/transfer";

import { PasswordError, ProfileError } from "../types/profile";
import type { SettingsSectionId } from "../types/section";

import {
  useChangePasswordMutation,
  useChangePinMutation,
  useResetPinMutation,
  useUpdateProfileMutation,
  useUpdateSecurityFlagsMutation,
} from "../hooks/use-profile-mutations";
import { useProfileQuery } from "../hooks/use-profile-query";
import type { PersonalDetailsValues } from "../schemas/personal-details-schema";
import type { ChangePasswordValues } from "../schemas/password-schema";

import { AccountInformationSection } from "./account-section";
import { ChangePasswordDialog } from "./change-password-dialog";
import { ChangePinDialog } from "./change-pin-dialog";
import { EditProfileDialog } from "./edit-profile-dialog";
import { MobileProfileOverview } from "./mobile-profile-overview";
import { NotificationSettingsSection } from "./notifications-section";
import { PersonalDetailsSection } from "./personal-details-section";
import { ProfileHub } from "./profile-hub";
import { SecuritySettingsSection } from "./security-section";
import { SettingsDesktopNav, SettingsMobileTabs } from "./settings-nav";
import { SettingsError } from "./settings-error";
import { SettingsSecurityBanner } from "./settings-security-banner";
import { SettingsSkeleton } from "./settings-skeleton";
import { ThemeSettingsSection } from "./theme-section";
import { TransactionPinSection } from "./pin-section";

export function SettingsView() {
  const query = useProfileQuery();
  const { theme, handleThemeChange } = useThemePreference();
  const updateProfile = useUpdateProfileMutation();
  const updateFlags = useUpdateSecurityFlagsMutation();
  const changePassword = useChangePasswordMutation();
  const changePin = useChangePinMutation();
  const resetPin = useResetPinMutation();

  const [section, setSection] = useState<SettingsSectionId>("profile");
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pinMode, setPinMode] = useState<"change" | "reset">("change");
  const [success, setSuccess] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [pinError, setPinError] = useState<string | null>(null);

  function openEdit() {
    setEditError(null);
    setEditOpen(true);
  }

  function openPassword() {
    setPasswordError(null);
    setPasswordOpen(true);
  }

  function openPin(mode: "change" | "reset") {
    setPinError(null);
    setPinMode(mode);
    setPinOpen(true);
  }

  if (query.isPending) {
    return <SettingsSkeleton />;
  }

  if (query.isError || !query.data) {
    return <SettingsError onRetry={() => void query.refetch()} />;
  }

  const profile = query.data;

  async function handleSaveProfile(values: PersonalDetailsValues) {
    setEditError(null);

    try {
      await updateProfile.mutateAsync(values);
      setEditOpen(false);
      setSuccess("Profile updated successfully.");
    } catch (error) {
      setEditError(
        error instanceof ProfileError
          ? error.message
          : "Unable to update your profile. Please try again.",
      );
    }
  }

  async function handleSavePassword(values: ChangePasswordValues) {
    setPasswordError(null);

    try {
      await changePassword.mutateAsync(values);
      setPasswordOpen(false);
      setSuccess("Password updated successfully.");
    } catch (error) {
      setPasswordError(
        error instanceof PasswordError || error instanceof ProfileError
          ? error.message
          : "Unable to update your password. Please try again.",
      );
    }
  }

  async function handleSavePin(input: {
    currentPin: string;
    newPin: string;
    confirmPin: string;
  }) {
    setPinError(null);

    try {
      await changePin.mutateAsync(input);
      setPinOpen(false);
      setSuccess("Transaction PIN updated successfully.");
    } catch (error) {
      setPinError(
        error instanceof PinError || error instanceof ProfileError
          ? error.message
          : "Unable to update your PIN. Please try again.",
      );
    }
  }

  async function handleResetPin() {
    setPinError(null);

    try {
      await resetPin.mutateAsync();
      setPinOpen(false);
      setSuccess("Transaction PIN reset successfully.");
    } catch {
      setPinError("Unable to reset your PIN. Please try again.");
    }
  }

  const sectionContent = {
    profile: (
      <>
        <div className="hidden lg:block">
          <ProfileHub
            profile={profile}
            theme={theme}
            onThemeChange={handleThemeChange}
            onSelectSection={setSection}
            onEdit={openEdit}
          />
        </div>
        <div className="lg:hidden">
          <MobileProfileOverview
            profile={profile}
            theme={theme}
            isUpdatingFlags={updateFlags.isPending}
            onThemeChange={handleThemeChange}
            onSelectSection={setSection}
            onEdit={openEdit}
            onChangePassword={openPassword}
            onChangePin={() => openPin("change")}
            onToggleTwoFactor={(enabled) =>
              void updateFlags.mutateAsync({ twoFactorEnabled: enabled })
            }
            onToggleBiometric={(enabled) =>
              void updateFlags.mutateAsync({ biometricEnabled: enabled })
            }
          />
        </div>
      </>
    ),
    personal: (
      <PersonalDetailsSection profile={profile} onEdit={openEdit} />
    ),
    account: <AccountInformationSection profile={profile} />,
    security: (
      <SecuritySettingsSection
        profile={profile}
        isUpdatingFlags={updateFlags.isPending}
        onChangePassword={openPassword}
        onChangePin={() => openPin("change")}
        onToggleTwoFactor={(enabled) =>
          void updateFlags.mutateAsync({ twoFactorEnabled: enabled })
        }
        onToggleBiometric={(enabled) =>
          void updateFlags.mutateAsync({ biometricEnabled: enabled })
        }
      />
    ),
    pin: (
      <TransactionPinSection
        onChange={() => openPin("change")}
        onReset={() => openPin("reset")}
      />
    ),
    theme: (
      <ThemeSettingsSection theme={theme} onThemeChange={handleThemeChange} />
    ),
    notifications: <NotificationSettingsSection />,
  }[section];

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden">
      <div>
        <h1 className="text-center text-base font-semibold text-foreground lg:text-left lg:text-3xl lg:tracking-tight">
          <span className="lg:hidden">Settings</span>
          <span className="hidden lg:inline">Profile &amp; Settings</span>
        </h1>
        <p className="mt-1 hidden text-sm text-muted-foreground lg:block">
          Manage your account preferences and security.
        </p>
      </div>

      {success ? (
        <p role="status" className="text-sm font-medium text-success">
          {success}
        </p>
      ) : null}

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
        <div className="lg:col-span-3">
          <SettingsDesktopNav section={section} onSectionChange={setSection} />
          <SettingsMobileTabs section={section} onSectionChange={setSection} />
        </div>
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-9">
          {sectionContent}
          {section === "profile" ? <SettingsSecurityBanner /> : null}
        </div>
      </div>

      <EditProfileDialog
        open={editOpen}
        profile={profile}
        isPending={updateProfile.isPending}
        error={editError}
        onOpenChange={setEditOpen}
        onSave={handleSaveProfile}
      />
      <ChangePasswordDialog
        open={passwordOpen}
        isPending={changePassword.isPending}
        error={passwordError}
        onOpenChange={setPasswordOpen}
        onSave={handleSavePassword}
      />
      <ChangePinDialog
        open={pinOpen}
        mode={pinMode}
        isPending={changePin.isPending || resetPin.isPending}
        error={pinError}
        onOpenChange={setPinOpen}
        onChangePin={handleSavePin}
        onResetPin={handleResetPin}
      />
    </div>
  );
}
