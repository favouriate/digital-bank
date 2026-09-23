# OpenPay

OpenPay is a frontend-only digital banking portfolio application. It demonstrates authentication, account overview, multi-currency transfers, transaction history and details, profile settings, support workflows, responsive navigation, and light/dark themes using typed mock services.

The project does not contain a backend or process real payments. Browser storage is used only to make the demo session and ledger feel realistic.

## Technology

- Next.js App Router, React, and strict TypeScript
- Tailwind CSS and shadcn/ui primitives
- TanStack Query for server-like state and cache synchronization
- Zustand for temporary transfer workflow state
- React Hook Form and Zod for forms and validation
- Jest and Testing Library for automated tests

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The demo accepts any valid email with password `OpenPay!234`. Send Money accepts any four-digit PIN; this is demo behavior and is not a security model.

No environment variables are currently required.

## Commands

```bash
npm run dev        # development server
npm test           # Jest suite
npx tsc --noEmit   # TypeScript validation
npm run lint       # ESLint
npm run build      # production build
npm start          # serve a completed production build
```

TypeScript 7.0.2 is retained as the compiler through `@typescript/native`. TypeScript 6 is installed side-by-side as the compatibility API required by ESLint and other JavaScript-based tooling during the TypeScript 7 transition.

## Application routes

The primary product routes are `/`, `/transfers`, `/transactions`, `/transactions/[id]`, `/settings`, and `/support`. Authentication routes are `/login`, `/register`, and `/forgot-password`. `/activity`, `/analytics`, `/invoices`, `/messages`, and `/wallets` are intentional placeholder pages retained for existing links.

## Architecture

Routes remain thin and compose feature-owned views from `src/features`. Interactive views call TanStack Query hooks, which call stable service modules; those services currently delegate to typed mocks. Presentation components do not import mock datasets directly. A future backend should replace service implementations while retaining the hooks and UI-facing domain contracts.

TanStack Query owns dashboard, transaction, profile, recipient, destination, and support data. Zustand owns only the in-progress transfer draft. The canonical demo account is stored as USD cents; transfers retain their original amount and currency while settlement is calculated separately in USD.



## Demo storage and limitations

- `sessionStorage` holds the demo session, display preference, and versioned ledger for the current tab.
- `localStorage` may retain the remembered login email and theme preference.
- Logging out clears the demo session and resets the ledger.
- Authentication, authorization, PIN checks, exchange rates, transfer settlement, and support submissions are simulations. A real backend must independently validate identity, permissions, balances, idempotency, exchange rates, and all transaction inputs.
- Social authentication controls are demonstrative and report that the feature is unavailable.

## Future API integration

Implement real API adapters behind the existing feature service contracts. Do not move secrets or authoritative banking rules into the browser. Normalize API errors in services, keep remote state in TanStack Query, preserve query-key invalidation after mutations, and keep Zustand limited to transient client state.
