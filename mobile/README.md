# Wanderly — React Native (Expo)

The native companion to the Wanderly web app. It is an **additive** app: the
web project in the repository root is untouched and keeps working on its own.

Everything lives in `mobile/`:

```
App.js                    root: fonts, profile restore, splash, page router
index.js                  Expo entry point
src/screens/              one file per screen
src/components/           shared UI (nav, headers, like control, auth layout)
src/theme/                colors, typography tokens, bundled image map
src/data/                 seeded account, posts, services, flights
```

## Requirements

- Node 20+
- Expo SDK 58 (React Native 0.88, React 19)
- Expo Go for quick preview, or a development build for the photo picker

## Getting started

```bash
cd mobile
npm install
npx expo start          # scan the QR code with Expo Go
npx expo start --web    # same code on the web via react-native-web
```

`ios/` and `android/` are generated on demand (Continuous Native Generation).
Do not edit them by hand — configure native behaviour in `app.json` and config
plugins.

## Sign-in (demo mode)

The login screen is kept for the visual flow, but nothing is authenticated:

- The email/password fields are cosmetic — **Sign in** opens Home directly.
- **Google** and **Apple** do the same; there is no OAuth or native provider
  sheet.
- There is no registration, OTP code, password reset or session guard.
- The profile (name, bio, avatar) is stored locally in AsyncStorage.
- **Sign out** in Settings returns to the login screen.

There are no environment variables to configure and no `.env` file to create.

## Language and currency

Settings offers three languages (English, Bahasa Indonesia, 中文) and three
currencies (IDR, USD, CNY). Both choices are stored in AsyncStorage under
`wanderly.preferences.v1` and are restored on the next launch.

- Static UI copy is translated; destination names, descriptions and review
  data stay in English.
- Rates are fixed: 1 USD = 18,000 IDR = 6.66 CNY, and 1 CNY = 2,723 IDR.
- Service prices are authored in Rupiah, flight fares in US dollars, and both
  are converted only when displayed (`Rp 300.000`, `$16.67`, `¥110.17`).

## Navigation

The app deliberately uses a small page-state router in `App.js` that mirrors
the web `src/App.jsx` (including Android hardware back and the `detailOrigin`
/ `profileOrigin` / `tripsOrigin` trail). It does **not** use Expo Router, even
though `AGENTS.md` recommends it, because the web app's flow is state-driven
and the port keeps the two implementations aligned.

Flow: splash → onboarding → login → Home. From Home the bottom navigation
opens Services, My Trips and Settings; Settings → account opens the profile
feed.

## Building

```bash
npx expo-doctor                 # dependency / config health
npm run lint                    # ESLint (eslint-config-expo)
npx expo export --platform web  # bundle check (delete the output folder after)
npx expo run:android            # local development build
npx expo run:ios                # local development build (macOS only)
```

Cloud builds use EAS and the profiles in [`eas.json`](eas.json):

```bash
npx eas-cli@latest login
npx eas-cli@latest init          # one-time project link (extra.eas.projectId)
npx eas-cli@latest build --profile preview --platform android     # APK
npx eas-cli@latest build --profile production --platform android  # AAB
npx eas-cli@latest build --profile production --platform ios
```

`preview` produces an internally distributed Android APK; `production`
produces a Play Store AAB and an App Store archive. Update the
`ios.bundleIdentifier` / `android.package` in `app.json` if you publish under a
different organisation.

## Notes

- Images are bundled through `src/theme/images.js`; picked photos are stored
  as base64 data URIs in AsyncStorage.
- Comments exist only on post detail, with per-comment likes and a composer.
- Poppins weights 400/500/600/700/800 are loaded through
  `@expo-google-fonts/poppins`.
