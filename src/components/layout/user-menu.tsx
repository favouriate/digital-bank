"use client";

import Link from "next/link";
import { ChevronDown, CircleHelp, LogOut, Settings } from "lucide-react";

import { UserAvatar } from "@/components/layout/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/use-logout";
import type { User } from "@/types/user";

type UserMenuProps = {
  user: User;
};

export function UserMenu({ user }: UserMenuProps) {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            aria-label={`${user.name} menu`}
            className="h-9 gap-2 rounded-full px-0.5 lg:h-9 lg:rounded-lg lg:pr-2 lg:pl-1"
          />
        }
      >
        <UserAvatar user={user} interactive={false} />
        <span className="hidden max-w-[10rem] truncate text-sm text-foreground lg:inline">
          {user.name}
        </span>
        <ChevronDown
          className="hidden size-4 text-muted-foreground lg:block"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem render={<Link href="/settings" />}>
          <Settings aria-hidden="true" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/support" />}>
          <CircleHelp aria-hidden="true" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logout}>
          <LogOut aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
