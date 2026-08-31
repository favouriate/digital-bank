"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Contact } from "@/types/contact";

import { useStartTransfer } from "../hooks/use-start-transfer";

type RecentContactsProps = {
  contacts: Contact[];
  recipientCount: number;
};

export function RecentContacts({ contacts, recipientCount }: RecentContactsProps) {
  const startTransfer = useStartTransfer();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
        <p className="text-sm text-muted-foreground">
          {recipientCount} {recipientCount === 1 ? "recipient" : "recipients"}
        </p>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent contacts. People you send money to will appear here.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {contacts.map((contact) => (
              <li key={contact.id}>
                <button
                  type="button"
                  className="flex min-h-11 min-w-11 flex-col items-center gap-1"
                  aria-label={`Send money to ${contact.name}`}
                  onClick={() => startTransfer({ recipientId: contact.id })}
                >
                  <Avatar>
                    <AvatarFallback>{contact.initials}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-16 truncate text-xs font-medium">
                    {contact.name.split(" ")[0]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
