"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TRANSFER_PIN_LENGTH } from "@/features/transfers/schemas/transfer-schema";

type ChangePinDialogProps = {
  open: boolean;
  mode: "change" | "reset";
  isPending: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onChangePin: (input: {
    currentPin: string;
    newPin: string;
    confirmPin: string;
  }) => Promise<void>;
  onResetPin: () => Promise<void>;
};

export function ChangePinDialog({
  open,
  mode,
  isPending,
  error,
  onOpenChange,
  onChangePin,
  onResetPin,
}: ChangePinDialogProps) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    if (open) {
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    }
  }, [open]);

  const canSubmitChange =
    currentPin.length === TRANSFER_PIN_LENGTH &&
    newPin.length === TRANSFER_PIN_LENGTH &&
    confirmPin.length === TRANSFER_PIN_LENGTH;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "reset" ? "Reset transaction PIN" : "Change transaction PIN"}
          </DialogTitle>
          <DialogDescription>
            {mode === "reset"
              ? "Reset restores the demo PIN used for Send Money. The PIN is never saved in your browser."
              : "Enter your current 4-digit PIN, then choose a new one. It is never saved in your browser."}
          </DialogDescription>
        </DialogHeader>
        {mode === "reset" ? (
          <div className="flex flex-col gap-4">
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isPending}
                aria-busy={isPending}
                onClick={() => void onResetPin()}
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Resetting
                  </>
                ) : (
                  "Reset PIN"
                )}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              void onChangePin({ currentPin, newPin, confirmPin });
            }}
          >
            <PinField
              id="current-pin"
              label="Current PIN"
              value={currentPin}
              disabled={isPending}
              onChange={setCurrentPin}
            />
            <PinField
              id="new-pin"
              label="New PIN"
              value={newPin}
              disabled={isPending}
              onChange={setNewPin}
            />
            <PinField
              id="confirm-pin"
              label="Confirm new PIN"
              value={confirmPin}
              disabled={isPending}
              onChange={setConfirmPin}
            />
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !canSubmitChange}
                aria-busy={isPending}
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Saving
                  </>
                ) : (
                  "Update PIN"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PinField({
  id,
  label,
  value,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">
        <InputOTP
          id={id}
          maxLength={TRANSFER_PIN_LENGTH}
          value={value}
          disabled={disabled}
          onChange={onChange}
        >
          <InputOTPGroup>
            {Array.from({ length: TRANSFER_PIN_LENGTH }, (_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
