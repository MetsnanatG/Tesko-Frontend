# MIGRATE-ANGULAR-20

This document captures the migration plan and concrete steps for bringing the `tesko-frontend` project to a clean, supported Angular 20 setup (verification, upgrades, and any code changes required).

NOTE: The current frontend already uses Angular 20 packages and standalone/bootstrapApplication patterns. This file documents a safe verification + cleanup + upgrade workflow and rollback guidance.

## Audit summary (quick)
- @angular/* packages: ^20.3.0
- @angular/cli / @angular/build: ^20.3.12
- TypeScript: ~5.9.2
- RxJS: ~7.8.0
- @microsoft/signalr: ^10.0.0 (present in `package.json`, but no direct imports found in `src/` — server side Razor might be using SignalR)
- App uses `bootstrapApplication()` and standalone component patterns (Angular 20 reactive signals present).

## Goals
- Verify current Angular 20 install is healthy and reproducible.
- Consolidate packages, remove unused deps, and pin safe versions.
- Ensure build & dev server work under recommended Node LTS.
- Update CI/dev docs and provide migration steps for others.

## Prerequisites (dev machine)
- Node 18.x or Node 20.x LTS (recommended). Verify with:

```bash
node --version
npm --version
```

- Angular CLI (global optional): `npm i -g @angular/cli@20`

## Workspace verification steps
Run these from `tesko-frontend/`.

```bash
# install reproducible tree
npm ci

# run a dev server and smoke-test
npm start
# open http://localhost:4200 and verify the app renders

# run a production build
npm run build
```

If `npm ci` fails, run `npm install` to troubleshoot dependency resolution.

## Clean-up & optional upgrade steps
1. Remove packages that are not used (manually inspect imports). Example: if `@microsoft/signalr` isn't used in `src/` remove it from `package.json`.

```bash
# remove unused package
npm uninstall @microsoft/signalr
```

2. If you want to re-run angular update scaffolding (mostly for major jumps):

```bash
# (optional) use the cli to help with package compatibility
npx @angular/cli@20 update @angular/cli@20 @angular/core@20
```

3. Check TypeScript and RxJS compatibility; Angular 20 supports TypeScript 5.9, so `typescript@~5.9.2` is fine.

## SignalR / real-time considerations
- Server-side SignalR is still used by the backend (ASP.NET). The frontend app can use the `@microsoft/signalr` npm package *if* the SPA is consuming hub messages directly.
- If you keep SignalR in the frontend, import it where needed, e.g.:

```ts
import * as signalR from '@microsoft/signalr';
const hub = new signalR.HubConnectionBuilder()
  .withUrl('/dashboardHub')
  .withAutomaticReconnect()
  .build();

await hub.start();
```

- If SignalR calls are made from the Razor views (server-side), you may not need the npm package in the Angular project.

## Tests and manual verification
- Verify these flows after build/dev server is running:
  - Login flow (client-side routing works)
  - Create request (if UI exists) and see server response
  - Notification badge (if Angular handles it) — if badge is in Razor layout, verify server flow instead
  - Dashboard charts (if present)
- Run unit tests (if configured): `npm test`

## Commit/branching guidance (local steps)
Because the local environment in this workspace may not have an initialized git repo inside `tesko-frontend`, run these from your repository root where `.git` exists.

```bash
# create a migration branch locally
git checkout -b frontend/migrate-angular-20

# add and commit the migration doc
git add tesko-frontend/MIGRATE-ANGULAR-20.md
git commit -m "chore(frontend): add migration plan for Angular 20" 

# push and open PR
git push -u origin frontend/migrate-angular-20
```

If your repo root is the Dotnet workspace, run the commands from that root.

## Rollback plan
- If an upgrade step breaks the app, revert the package changes:

```bash
git checkout -- package.json package-lock.json
npm ci
```

## Notes & follow-ups
- I recommend adding `engines` to `tesko-frontend/package.json` to document the supported Node version, e.g.:

```json
"engines": { "node": ">=18 <23" }
```

- Optionally add a short `frontend/README.md` with `npm ci` and `npm start` instructions for frontend devs.

---

Last updated: 2025-11-26
