# Security Audit: Latest Commit (91e9c09 — "added a level engine diagram")

This report covers the **diff from the previous commit** (all changes in 91e9c09). Scope: authentication, authorization, injection, XSS, CSRF, IDOR, secrets, env usage, deserialization, file uploads, redirects, CORS, crypto, third-party usage, race conditions, and sensitive data exposure.

---

## 1. Authentication and authorization

**Reviewed.** No auth logic was changed in this commit.

- **Login page** (`src/app/login/page.tsx`): Only CSS class updates (focus ring color `#5a35f8` → `#533fec`). No change to `signInWithPassword`, `signInWithOAuth`, or redirect handling.
- **Protected routes**: Middleware and dashboard/onboarding guards were not modified.
- **Session handling**: No changes to Supabase client or server usage in the diff.

**Verdict:** No authentication or authorization flaws introduced. Appears secure for this commit.

---

## 2. Injection (SQL, NoSQL, command, template)

**Reviewed.** No injection surfaces were added or changed.

- **Engine components**: `EngineAnimation.tsx` and `EngineAnimationLarge.tsx` use:
  - `pathD` / `lane.d`: built from `buildBezierPath(from, to)` and similar helpers with **numeric** `Point` values from constants (`INPUTS`, `OUTPUTS`, `NODES`, `ALL_PATHS`). No user or request input is concatenated into paths or commands.
- **Landing/content**: `landingCopy.ts`, `chartConfig.ts`, and all changed landing components use static copy or React props. No user input interpolated into queries or shell.
- **Waitlist API / emails**: Not modified in this commit; existing validation and parameterized usage remain unchanged.

**Verdict:** No injection vulnerabilities found in the changed code.

---

## 3. XSS (stored, reflected, DOM-based)

**Reviewed.** No new XSS vectors in the commit.

- **No `dangerouslySetInnerHTML` / `innerHTML` / `eval`**: Grep across `src` shows none in the codebase.
- **Email components**: `WelcomeEmail.tsx` and `AdminNotificationEmail.tsx` only had **color** changes (e.g. `#8b6cf9` → `#533fec`). User-derived values (`email`, `referralCode`, `rank`, `totalCount`, `referredBy`) are rendered via React/React Email components, which escape by default.
- **Engine / landing**: All changed UI uses React elements and static or constant data (e.g. `item.label`, `node.label` from `NODES`). No raw HTML or unsanitized user input.

**Verdict:** No XSS issues found in the changed files.

---

## 4. CSRF

**Reviewed.** No form or state-changing endpoints were changed.

- **Login/signup**: Form submission and OAuth flows unchanged; Same-Origin and Supabase handling unchanged.
- **Waitlist API**: Not in this commit’s diff.
- **Next.js**: Same-origin and cookie behavior unchanged.

**Verdict:** No CSRF vulnerabilities introduced. Appears secure for this commit.

---

## 5. Insecure direct object references (IDOR)

**Reviewed.** No resource access by ID was added or modified.

- This commit adds docs, CSS, theme tokens, engine animation components, and landing reorg. No API routes or data-access layers were changed.

**Verdict:** No IDOR issues in the changed code.

---

## 6. Hardcoded secrets

**Reviewed.** No secrets were added.

- Changes are limited to:
  - Hex colors (e.g. `#533fec`), CSS variables, chart/config constants.
  - Docs (`docs/engine-animation-dot-timings.md`).
  - No API keys, tokens, passwords, or private keys.

**Verdict:** No hardcoded secrets in the commit.

---

## 7. Insecure environment variable usage

**Reviewed.** No env usage was changed in this commit.

- **WelcomeEmail** (only styling/color changed): Still uses `process.env.NEXT_PUBLIC_APP_URL ?? "https://alevelmentor.com"` for public URL. Safe.
- No new `process.env` usage and no server-only secrets exposed to client in the diff.

**Verdict:** Environment variable usage in changed code appears secure.

---

## 8. Unsafe deserialization

**Reviewed.** No deserialization of untrusted data was added or changed.

- No new use of `JSON.parse` on user input, no custom deserializers or `eval`-based parsing in the diff.

**Verdict:** No unsafe deserialization in the changed code.

---

## 9. File upload vulnerabilities

**Reviewed.** No file upload logic was added or modified in this commit.

**Verdict:** N/A for this commit.

---

## 10. Open redirects

**Reviewed.** No redirect logic was changed in this commit.

- **Auth callback** (`src/app/auth/callback/route.ts`): Not in the diff. Existing implementation uses `getSafeRedirect(next)`, which rejects protocol-relative and absolute URLs and allows only relative paths. Redirect uses `request.url`’s origin, not user-controlled host.
- **Middleware**: Redirect to `/login` uses `request.nextUrl.clone()` and sets `pathname = "/login"` — no user-controlled redirect.
- **Login page**: OAuth `redirectTo` is `${window.location.origin}/auth/callback` — same-origin, not user-controlled.
- **Engine/landing**: No new redirects or `href` from user input in the changed code.

**Verdict:** No open redirect issues in the changed code. Existing callback redirect validation is sound.

---

## 11. CORS

**Reviewed.** No CORS configuration was changed.

- `next.config.ts` was not modified. No new API routes or CORS headers in the diff.

**Verdict:** No CORS misconfiguration introduced. Appears secure for this commit.

---

## 12. Weak cryptography or improper hashing

**Reviewed.** No crypto or hashing code was added or changed.

- Referral code generation and password hashing live in unchanged files (e.g. waitlist API, Supabase Auth).

**Verdict:** No cryptographic issues in the changed code.

---

## 13. Insecure third-party package usage

**Reviewed.** No new dependencies or usage patterns were introduced in the commit.

- Changed code uses existing libraries (e.g. `framer-motion`, `lucide-react`, `@react-email/components`, `next`) in the same way as before. No new `dangerouslySetInnerHTML`, `eval`, or unsafe dynamic imports.

**Verdict:** No insecure third-party usage identified in the diff.

---

## 14. Race conditions or logic flaws

**Reviewed.** No critical race or logic bugs found in the changed code.

- **EngineAnimation.tsx**: Resize/measure logic was updated with debouncing and cleanup (`clearTimeout(timeoutId)`, `cancelAnimationFrame(rafId)`). This reduces races and leaks rather than introducing them.
- **EngineAnimationLarge.tsx**: New component uses `useMemo`/constants for paths and nodes; no shared mutable state that could cause races.
- **DashboardPreviewSection**: `hasUserScrolled` and scroll listener are straightforward; no obvious TOCTOU or race in the diff.

**Verdict:** No race conditions or logic flaws identified in the changed code.

---

## 15. Sensitive data exposure in logs or responses

**Reviewed.** No new logging or response fields in the commit.

- **Waitlist API**: Not modified; existing `console.log(\`[waitlist] Complete for ${email}...\`)` is unchanged and only logs email (operational). No new PII in logs in the diff.
- **Engine/landing**: No logging of user data. No new API responses or error messages exposing internals.

**Verdict:** No new sensitive data exposure in logs or responses.

---

## Summary

| Category                         | Status   | Notes                                                                 |
|----------------------------------|----------|-----------------------------------------------------------------------|
| Authentication / authorization   | Secure   | No auth changes in commit                                            |
| Injection                       | Secure   | No user input in queries, commands, or templates in changed code       |
| XSS                             | Secure   | No raw HTML; React/React Email escaping in use                       |
| CSRF                            | Secure   | No new state-changing endpoints or forms                              |
| IDOR                            | Secure   | No resource-by-ID logic changed                                      |
| Hardcoded secrets                | Secure   | None added                                                            |
| Env usage                        | Secure   | No new or changed env usage                                           |
| Unsafe deserialization           | Secure   | None in changed code                                                  |
| File upload                      | N/A      | No upload logic in commit                                             |
| Open redirects                   | Secure   | Redirect logic unchanged; callback uses safe redirect validation      |
| CORS                            | Secure   | No CORS changes                                                       |
| Cryptography                     | Secure   | No crypto/hashing in commit                                          |
| Third-party usage                | Secure   | No new unsafe patterns                                                |
| Race conditions / logic          | Secure   | Debounce/cleanup improves behavior                                   |
| Sensitive data in logs/responses | Secure   | No new exposure                                                      |

**Overall:** The latest commit (91e9c09) does not introduce security issues in the areas audited. Changes are confined to branding/theme, engine diagram behavior, landing structure, and documentation. Existing security controls (auth callback redirect validation, waitlist validation, React escaping, middleware) are unchanged and remain in place.

---

## Optional hardening (outside this commit)

- **Signout redirect** (`src/app/auth/signout/route.ts`): Currently redirects to `origin` from `request.url`. In environments where the `Host` header is not fully trusted, consider redirecting to an allowlisted base URL (e.g. `process.env.NEXT_PUBLIC_APP_URL` or a fixed domain) to avoid any possibility of redirect to a malicious host.
- **CSP**: Existing `next.config.ts` uses `'unsafe-inline'` and `'unsafe-eval'` for scripts (e.g. PostHog). When feasible, moving to nonces or strict hashes would strengthen XSS mitigation.

These are improvements to the existing codebase, not findings in the latest commit.
