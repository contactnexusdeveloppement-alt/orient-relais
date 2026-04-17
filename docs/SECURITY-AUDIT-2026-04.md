# Security Audit Fixes — 2026-04

> Branch: `security/audit-fixes-2026-04`
> Scope: Fix les 5 problèmes critiques/graves identifiés par audit 2026-04-17.

## Findings prioritaires

| # | Sévérité | Fichier | Problème |
|---|----------|---------|----------|
| 1 | HAUTE    | `lib/sanitize.ts`                         | Sanitization regex bypass via `<svg/onload>` |
| 2 | HAUTE    | `app/api/auth/register/route.ts:18`       | Password min 6 chars, pas de regex email |
| 3 | MOYENNE  | `app/api/auth/{login,register}/route.ts`  | Pas de rate limiting → brute force |
| 4 | CRITIQUE | `next.config.ts:42`                       | CSP `'unsafe-eval'` → XSS |
| 5 | CRITIQUE | `app/api/wp-proxy/[...path]/route.ts:50`  | `rejectUnauthorized: false` → MITM |

## Plan d'exécution (commit-per-fix)

### Task 1 — Sanitization XSS-safe
- Install `isomorphic-dompurify`
- Remplacer `lib/sanitize.ts::sanitizeHtml` : utilise DOMPurify avec allowlist tags/attrs identique
- `escapeHtml` (emails) garde la version actuelle
- Commit: `security: replace regex sanitizer with isomorphic-dompurify`

### Task 2 — Validation input + password strength
- Install `zod`
- Créer `lib/validation.ts` : schemas Register, Login (email format, password ≥ 10 chars avec uppercase + chiffre + symbole)
- Patcher `app/api/auth/register/route.ts` : validate avec zod, retourner 400 lisible
- Patcher `app/api/auth/login/route.ts` : validate email format
- Commit: `security: add zod validation + stronger password rules on auth endpoints`

### Task 3 — Rate limiting
- Créer `lib/rate-limit.ts` : sliding-window in-memory (Map) — limite 5 tentatives / 15 min par IP+endpoint
- Note : en-mémoire = OK pour MVP (Vercel single-region warm). TODO: Upstash/Redis pour multi-region
- Appliquer dans `app/api/auth/login/route.ts` et `register/route.ts` → 429 si dépassé
- Commit: `security: add in-memory rate limiting on auth endpoints`

### Task 4 — CSP sans unsafe-eval
- Retirer `'unsafe-eval'` du `script-src` dans `next.config.ts`
- Garder `'unsafe-inline'` pour le moment (gtag + JSON-LD l'exigent — nonce impossible en Next headers() async)
- Build + test dev : vérifier que Stripe + Mondial Relay + GA4 fonctionnent toujours
- Commit: `security: remove 'unsafe-eval' from CSP script-src`

### Task 5 — SSL proxy : cert validation correcte
- Patcher `app/api/wp-proxy/[...path]/route.ts` :
  - `rejectUnauthorized: true`
  - `checkServerIdentity: (host, cert) => tls.checkServerIdentity(WP_DOMAIN, cert)` — valide cert contre le SNI (`WP_DOMAIN`) au lieu de l'IP
- Reduce console.logs (ne pas logger chaque request en prod)
- Commit: `security: validate SSL cert against SNI hostname in wp-proxy`

### Task 6 — Cleanup fichiers parasites
- Delete: `output.json`, `recent_files.txt`, `test-boutique.html`
- Commit: `chore: remove stray files (output.json, recent_files.txt, test-boutique.html)`

### Task 7 — Finalisation
- `npm install` pour vérifier package-lock.json
- `npm run build` : must pass
- `npm run lint` : must pass
- Push branche → ouvrir PR

## Out of scope (à traiter après)
- Conversion PNG → WebP (perf, 2h)
- Configuration Upstash Redis pour rate-limit multi-region (prod)
- Tests automatisés (aucun framework actuellement)
- Audit OWASP complet post-fix
