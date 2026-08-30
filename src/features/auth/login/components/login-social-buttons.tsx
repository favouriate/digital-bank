import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type LoginSocialButtonsProps = {
  disabled?: boolean;
  onUnavailable: () => void;
};

export function LoginSocialButtons({
  disabled,
  onUnavailable,
}: LoginSocialButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <SocialButton
        label="Google"
        disabled={disabled}
        onClick={onUnavailable}
        icon={<GoogleMark />}
      />
      <SocialButton
        label="Apple"
        disabled={disabled}
        onClick={onUnavailable}
        icon={<AppleMark />}
      />
      <SocialButton
        label="Microsoft"
        disabled={disabled}
        onClick={onUnavailable}
        icon={<MicrosoftMark />}
      />
    </div>
  );
}

function SocialButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="h-11 min-h-11 w-full gap-2 rounded-lg"
    >
      {icon}
      {label}
    </Button>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.3-1.9 3l3 2.3c1.8-1.6 2.9-4 2.9-6.9 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3 5.5 15.1 2.1 17.8C4.2 22 7.8 24 12 24c3.2 0 5.9-1.1 7.9-2.9l-3-2.3C15.6 19.7 13.9 20.2 12 20.2c-3.1 0-5.8-2.1-6.7-4.9z"
      />
      <path
        fill="#4A90E2"
        d="M2.1 6.2C1.4 7.6 1 9.2 1 11s.4 3.4 1.1 4.8l4.5-3.5C6.3 11.5 6.2 10.7 6.2 10s.1-1.5.4-2.3z"
      />
      <path
        fill="#FBBC05"
        d="M12 3.8c1.7 0 3.3.6 4.5 1.8l2.7-2.7C17.9 1.1 15.2 0 12 0 7.8 0 4.2 2 2.1 6.2l4.5 3.5C6.2 6.9 8.9 3.8 12 3.8z"
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 3 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.2 2.8-2.3c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.6-3.6zM14.7 5.8c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3z"
      />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  );
}
