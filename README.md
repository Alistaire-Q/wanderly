# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Sign-in (demo mode)

The login screen is kept for the visual flow, but it no longer authenticates:

- The email and password fields are cosmetic — **Sign in** opens Home directly.
- The **Google** and **Apple** buttons do the same; there is no OAuth.
- There is no registration, email OTP, password reset or persisted session.
- Profile name, bio and avatar edits are saved in `localStorage` on the device.
- **Sign out** in Settings simply returns to the login screen.

There is no backend or environment configuration to set for sign-in.

## Language and currency

Settings offers three languages (English, Bahasa Indonesia, 中文) and three
currencies (IDR, USD, CNY). Both choices are stored under
`wanderly.preferences.v1` in `localStorage` and survive a reload.

- Static UI copy is translated; destination names, descriptions and review
  data stay in English.
- Rates are fixed: 1 USD = 18,000 IDR = 6.66 CNY, and 1 CNY = 2,723 IDR.
- Service prices are authored in Rupiah, flight fares in US dollars, and both
  are converted only when displayed (`Rp 300.000`, `$16.67`, `¥110.17`).

## Mobile app (React Native / Expo)

`mobile/` contains the Expo port of the same screens and auth rules. It is
additive and does not affect this web app. See
[`mobile/README.md`](mobile/README.md) for setup, `EXPO_PUBLIC_*` environment
variables, Google/Apple configuration, sandbox delivery and build commands.

## Deployment

### Production URL

- **Web:** https://wanderly-tau-weld.vercel.app/
  with the URL Vercel shows after the first import (Vercel may append a suffix
  if the `wanderly` name is already taken).
- **Mobile:** preview APKs and production builds are distributed through EAS;
  the install link/QR code is shown on the build page and in `eas build:list`.

### Web — Vercel

The repo root is the web app. [`vercel.json`](vercel.json) pins the build to
`npm run build`, the output to `dist`, and rewrites every route to
`/index.html` so a direct visit or refresh on any path still loads the SPA.

Dashboard import steps:

1. Push the repository to GitHub (see the initial-commit notes below).
2. Open the [Vercel dashboard](https://vercel.com/new) → **Add New… → Project**
   → **Import Git Repository**, then choose the repository.
3. Leave **Root Directory** at `./` (the web app lives at the root, not in
   `mobile/`). Vercel reads `vercel.json`, so the framework preset is **Vite**,
   the build command is `npm run build`, the install command is `npm ci`, and
   the output directory is `dist`.
4. Add any `VITE_*` environment variables under **Environment Variables**
   (none are required today).
5. Click **Deploy**. Every push to `main` ships to production and pull requests
   get preview URLs.

CLI alternative:

```bash
npm install -g vercel
vercel link          # link this folder to the Vercel project
vercel --prod        # deploy production
```

The dev server (`npm run dev`) and `npm run preview` are only for local use;
Vercel always runs the production build.

### Mobile — EAS

[`mobile/eas.json`](mobile/eas.json) defines two profiles:

- `preview` — internal distribution, Android **APK** for testers.
- `production` — store build, Android **AAB** (default iOS archive).

One-time setup:

```bash
cd mobile
npx eas-cli@latest login
npx eas-cli@latest init      # links the project and writes extra.eas.projectId
```

`eas init` needs an Expo account and creates/links the EAS project. Let EAS
manage the Android keystore when the first build prompts for credentials.

Build commands:

```bash
# Preview APK (Android)
npx eas-cli@latest build --profile preview --platform android

# Production Android AAB
npx eas-cli@latest build --profile production --platform android

# Production iOS archive
npx eas-cli@latest build --profile production --platform ios

# Recent builds and install links
npx eas-cli@latest build:list
```

Run these from `mobile/` (EAS resolves `eas.json` and `app.json` there). Bump
`expo.version` in `mobile/app.json` for store releases, and keep
`android.package` / `ios.bundleIdentifier` aligned with the store listing.

### Environment variables

- **Web:** create `VITE_*` variables in Vercel → Project → Settings →
  Environment Variables (Production/Preview/Development). They are inlined at
  build time, so redeploy after changing them. For local development put the
  same keys in `.env.local`; `.env*` is git-ignored. No variables are required
  by the current demo app.
- **Mobile:** use EAS environment variables under
  [expo.dev](https://expo.dev/accounts) → Project → Environment Variables, or
  `npx eas-cli@latest env:create --name EXPO_PUBLIC_API_URL --value <value>
  --environment production --visibility plaintext`. Only `EXPO_PUBLIC_*` values
  reach the client, and they are embedded at build time, so rebuild after a
  change. For local development use `mobile/.env` (also git-ignored). No
  variables are required by the current demo app.
- **GitHub Actions:** add repository secrets under **Settings → Secrets and
  variables → Actions** and read them with `${{ secrets.NAME }}`. The current CI
  workflow only runs lint/build and needs no secrets.

### CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and
pull request targeting `main`:

- **web** — Node 20 with npm cache, `npm ci`, `npm run lint`, `npm run build`.
- **mobile** — Node 20 with npm cache for `mobile/package-lock.json`, `npm ci`
  in `mobile/`, then `npx expo lint`.

Vercel also builds pull requests, but the GitHub Actions check is the required
gate for lint and Expo lint.
