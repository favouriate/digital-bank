import { Info, Shield } from "lucide-react";

export function SecurityNotice() {
  return (
    <aside className="flex gap-3 rounded-xl bg-primary/10 px-4 py-3 text-sm text-foreground">
      <Shield className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <p>
        <span className="font-semibold">Secure & Encrypted. </span>
        Your transaction is protected with bank-level security.
      </p>
    </aside>
  );
}

export function ImportantNotice() {
  return (
    <aside className="flex gap-3 rounded-xl bg-muted px-4 py-3 text-sm text-foreground">
      <Info className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <p>
        <span className="font-semibold">Important information. </span>
        Funds will be available in your account instantly. Daily limit: $10,000.00
      </p>
    </aside>
  );
}
