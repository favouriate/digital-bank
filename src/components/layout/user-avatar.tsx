import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

type UserAvatarProps = {
  user: User;
  href?: string;
  interactive?: boolean;
  className?: string;
};

export function UserAvatar({
  user,
  href = "/settings",
  interactive = true,
  className,
}: UserAvatarProps) {
  const avatar = (
    <Avatar size="default" className="after:hidden">
      {user.avatarUrl ? (
        <AvatarImage
          src={user.avatarUrl}
          alt={interactive ? user.name : ""}
        />
      ) : null}
      <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
        {user.initials}
      </AvatarFallback>
    </Avatar>
  );

  if (!interactive) {
    return <span className={cn("inline-flex", className)}>{avatar}</span>;
  }

  return (
    <Link
      href={href}
      aria-label={`${user.name} profile`}
      className={cn("inline-flex rounded-full", className)}
    >
      {avatar}
    </Link>
  );
}
