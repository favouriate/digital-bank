"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Contact } from "@/types/contact";
import type { Transaction } from "@/types/transaction";

import { useSearchResults } from "../hooks/use-search-results";
import {
  formatAmount,
  formatTransactionDate,
  formatTransactionStatus,
} from "../lib/format";
import type { SearchPage } from "../lib/search-pages";

const itemClassName =
  "min-h-11 items-start py-2 [&>svg:last-child]:hidden sm:min-h-9";

type GlobalSearchProps = {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
};

export function GlobalSearch({
  className,
  open: openProp,
  onOpenChange,
  showTrigger = true,
}: GlobalSearchProps) {
  const router = useRouter();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useSearchResults(query);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
      if (!nextOpen) {
        setQuery("");
      }
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return;
      }

      if (event.code !== "KeyK" || !(event.metaKey || event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      handleOpenChange(!open);
    }

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [handleOpenChange, open]);

  function navigateTo(href: string) {
    handleOpenChange(false);
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger ? (
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Search"
              className={cn("size-11 lg:size-9", className)}
            />
          }
        >
          <Search className="size-5" aria-hidden="true" />
        </DialogTrigger>
      ) : null}
      <DialogContent
        showCloseButton={false}
        className={cn(
          "overflow-hidden p-0 sm:top-[18%] sm:max-w-lg sm:translate-y-0",
          "max-sm:inset-0 max-sm:top-0 max-sm:left-0 max-sm:flex max-sm:h-dvh max-sm:max-h-dvh max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none",
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search transactions, people, or pages
          </DialogDescription>
        </DialogHeader>
        <Command
          shouldFilter={false}
          className="max-sm:min-h-0 max-sm:flex-1"
        >
          <CommandInput
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search transactions, people, or pages..."
            aria-label="Search transactions, people, or pages"
          />
          <CommandList className="max-sm:max-h-none max-sm:flex-1">
            {results.showEmpty ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : null}

            {results.pages.length > 0 ? (
              <CommandGroup heading="Pages">
                {results.pages.map((page) => (
                  <PageResultItem
                    key={page.id}
                    page={page}
                    onSelect={() => navigateTo(page.href)}
                  />
                ))}
              </CommandGroup>
            ) : null}

            <PeopleResults
              contacts={results.contacts}
              isPending={results.isContactsPending}
              hasError={results.contactsError}
              onSelect={() => navigateTo("/transfers")}
            />

            <TransactionResults
              transactions={results.transactions}
              isPending={results.isTransactionsPending}
              hasError={results.transactionsError}
              onSelect={(id) => navigateTo(`/transactions/${id}`)}
            />
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function PageResultItem({
  page,
  onSelect,
}: {
  page: SearchPage;
  onSelect: () => void;
}) {
  const Icon = page.icon;

  return (
    <CommandItem
      value={`page:${page.id}`}
      onSelect={onSelect}
      className={itemClassName}
    >
      <Icon className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
      <span className="truncate">{page.label}</span>
    </CommandItem>
  );
}

function PeopleResults({
  contacts,
  isPending,
  hasError,
  onSelect,
}: {
  contacts: Contact[];
  isPending: boolean;
  hasError: boolean;
  onSelect: () => void;
}) {
  if (isPending) {
    return (
      <CommandGroup heading="People">
        <SearchGroupSkeleton label="Loading people" />
      </CommandGroup>
    );
  }

  if (hasError) {
    return (
      <p className="px-3 py-2 text-xs text-destructive" role="status">
        People could not be loaded.
      </p>
    );
  }

  if (contacts.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading="People">
      {contacts.map((contact) => (
        <CommandItem
          key={contact.id}
          value={`contact:${contact.id}`}
          onSelect={onSelect}
          className={itemClassName}
        >
          <Avatar size="sm">
            {contact.avatarUrl ? (
              <AvatarImage src={contact.avatarUrl} alt="" />
            ) : null}
            <AvatarFallback>{contact.initials}</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate">{contact.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {contact.provider}
            </span>
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

function TransactionResults({
  transactions,
  isPending,
  hasError,
  onSelect,
}: {
  transactions: Transaction[];
  isPending: boolean;
  hasError: boolean;
  onSelect: (id: string) => void;
}) {
  if (isPending) {
    return (
      <CommandGroup heading="Transactions">
        <SearchGroupSkeleton label="Loading transactions" />
      </CommandGroup>
    );
  }

  if (hasError) {
    return (
      <p className="px-3 py-2 text-xs text-destructive" role="status">
        Transactions could not be loaded.
      </p>
    );
  }

  if (transactions.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading="Transactions">
      {transactions.map((transaction) => {
        const isIncoming = transaction.amount > 0;
        const DirectionIcon = isIncoming ? ArrowDownLeft : ArrowUpRight;

        return (
          <CommandItem
            key={transaction.id}
            value={`transaction:${transaction.id}`}
            onSelect={() => onSelect(transaction.id)}
            className={itemClassName}
          >
            <span
              className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground"
              aria-hidden="true"
            >
              <DirectionIcon className="size-3.5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate">{transaction.description}</span>
              <span className="truncate text-xs text-muted-foreground">
                {formatTransactionDate(transaction.occurredAt)}
                {" · "}
                {formatTransactionStatus(transaction.status)}
              </span>
            </span>
            <span
              className={cn(
                "shrink-0 text-sm tabular-nums",
                isIncoming ? "text-success" : "text-foreground",
              )}
            >
              {formatAmount(transaction.amount, transaction.currency)}
            </span>
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function SearchGroupSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-2 px-2 py-1.5" aria-busy="true" aria-label={label}>
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
