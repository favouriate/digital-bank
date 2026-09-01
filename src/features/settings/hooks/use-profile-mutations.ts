"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  changePassword,
  changePin,
  resetPin,
  updateProfile,
  updateSecurityFlags,
} from "../services/profile-service";
import type {
  ChangePasswordInput,
  ChangePinInput,
  ProfilePatch,
  SecurityFlagsPatch,
} from "../types/profile";

import { profileQueryKey } from "./use-profile-query";

function useInvalidateProfile() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: profileQueryKey });
}

export function useUpdateProfileMutation() {
  const invalidate = useInvalidateProfile();

  return useMutation({
    mutationKey: ["profile", "update"],
    mutationFn: (patch: ProfilePatch) => updateProfile(patch),
    onSuccess: () => {
      void invalidate();
    },
  });
}

export function useUpdateSecurityFlagsMutation() {
  const invalidate = useInvalidateProfile();

  return useMutation({
    mutationKey: ["profile", "security-flags"],
    mutationFn: (patch: SecurityFlagsPatch) => updateSecurityFlags(patch),
    onSuccess: () => {
      void invalidate();
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationKey: ["profile", "change-password"],
    mutationFn: (input: ChangePasswordInput) => changePassword(input),
  });
}

export function useChangePinMutation() {
  return useMutation({
    mutationKey: ["profile", "change-pin"],
    mutationFn: (input: ChangePinInput) => changePin(input),
  });
}

export function useResetPinMutation() {
  return useMutation({
    mutationKey: ["profile", "reset-pin"],
    mutationFn: () => resetPin(),
  });
}
