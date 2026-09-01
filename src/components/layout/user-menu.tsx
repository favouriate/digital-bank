"use client";

import { ChevronDown, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

import { UserAvatar } from "@/components/layout/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/user";

type UserMenuProps = {
  user: User;
  onSearch: () => void;
};

export function UserMenu({ user, onSearch }: UserMenuProps) {
  const router = useRouter();

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
        <DropdownMenuItem onClick={onSearch}>
          <Search aria-hidden="true" />
          Search
          <DropdownMenuShortcut>Ctrl+K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings aria-hidden="true" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
