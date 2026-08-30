import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

type UserAvatarProps = {
  user: User;
  href?: string;
  className?: string;
};

export function UserAvatar({
  user,
  href = "/settings",
  className,
}: UserAvatarProps) {
  return (
    <Link
      href={href}
      aria-label={`${user.name} profile`}
      className={cn("inline-flex rounded-full", className)}
    >
      <Avatar size="default">
        {user.avatarUrl ? (
          <AvatarImage src={user.avatarUrl} alt={user.name} />
        ) : null}
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
