# Block Merge Rush — V8 Android / Google Play Preparation

## V8 status
The V7 board/merge engine, save migration, missions, achievements, Journey, Progress Road, Daily Rewards, skins, themes, power-ups, Bomb/Rainbow/Double, EN/TR localization and player data are preserved. V8 adds five differentiated modes, Nova Gems, premium cosmetics, cloud/billing/ad abstractions, safer move detection, visual redesigns, mode-isolated renderers and the final mobile Shop layout.

## Android 2026 target
As of September 2026, new Google Play apps and updates must target Android 16 / API 36. The project manifest source is therefore prepared to use Capacitor 8 (`@capacitor/* ^8.0.0`) rather than the old Capacitor 6 line. Capacitor 8's Android line targets/compiles API 36. Generate the Android project using the current compatible Android Studio/JDK/Node toolchain.

Suggested project commands:
- `npm install`
- `npx cap add android` (first Android generation only)
- `npx cap sync android`
- `npx cap open android`
- Build/sign a **release Android App Bundle (.aab)** in Android Studio/Gradle for Play Console.

The ZIP intentionally does not contain a private release keystore or signing secrets.

## Google Play Games / Cloud Save — future native integration
`CloudSaveManager` is the integration boundary. Web preview returns `false` from `isAvailable()` and never fakes sign-in, users, uploads or cloud data. Sync persistent progression only; do not sync a temporary active run. `lastModifiedAt` is available for conflict handling.

## Google Play Billing — Nova Gem packs
Prepared consumable IDs: `gems_50`, `gems_120`, `gems_300`, `gems_700`, `gems_1500`. Web preview never grants a fake purchase. Prices must come from Play product details. Production Gem crediting must happen only after verified purchase success and acknowledgement/consumption.

## AdMob — rewarded ads
`AdManager` reasons include `gameover_continue`, `run_summary_double_coins`, `shop_free_chest`, `timed_mode_extra_time`, and `free_gem`. The web preview has no real SDK. If AdMob is enabled later, add the native SDK/IDs, consent flow, Play Console Ads declaration, and keep reward grants tied to verified rewarded-success callbacks.

## Privacy / consent
V8 has a first-run Privacy & Data notice and a Settings -> Privacy Policy entry. `www/privacy-policy.html` is bundled for preview/reference. Google Play still requires a **public HTTPS privacy-policy URL** in Play Console; replace policy placeholders with the exact developer/contact details and host the page before release. Any optional advertising consent must be separate from the basic notice when required.

## Google Play files included
See `play-store/PLAY_STORE_RELEASE_CHECKLIST.md`, `play-store/DATA_SAFETY_DRAFT.md`, `play-store/STORE_LISTING_TR_EN.md`, `play-store/RELEASE_NOTES_V8_TR_EN.txt`, and `assets/store/README.md`.

## Test coverage
- V7 -> V8 save and score migration
- Full-board + Double remains playable
- Fruit/Animal renderer isolation between modes
- Classic/Fruit/Animal/Blitz/Survival configuration
- Nova Gem grant/spend/persistence/caps
- Premium cosmetic ownership/equip persistence
- Cloud/Billing/Rewarded unavailability in web preview without fake success
- First-run privacy gate + saved acknowledgement
- EN/TR rendering
- No duplicate IDs
- Responsive overflow checks at 320, 360, 375, 390, 412 and 430 px widths
- Shop header/card regression after Turkish long-string issue

## Important: what is not yet a real production service
The current ZIP has no live AdMob SDK, no live Google Play Billing integration, no purchase-verification backend, and no live Play Games cloud implementation. Those are intentionally not faked. You can publish a build with those monetization/cloud controls disabled, or integrate the native services before production if you want them functional at launch.

## V8.2 Interface Flow
- First install flow: Privacy notice -> Save Slot / Google Play entry -> tutorial -> modern home hub.
- Later launches: Save Slot / Google Play entry -> home hub (privacy notice only returns if its notice version changes).
- Slot 1 keeps the legacy `bmr_save` key so existing V7/V8 progress is preserved.
- Slot 2 uses `bmr_save_slot_2` as an independent local profile.
- Google Play Games remains an abstraction in the web preview; no fake sign-in or cloud success is performed.
- Theme shop cards now contain representative mini-board previews and explicit color palettes for Sunset, Midnight, Forest, Ocean, Galaxy, and Cyber.

## Online Leaderboards — Türkiye / Global

V8 RC includes the complete leaderboard UI and `LeaderboardManager` bridge architecture. Web preview does not generate fake ranking entries. Before Production, connect `window.BMRLeaderboardBridge` to an authenticated Android/backend implementation. Global ranking can map to Google Play Games Leaderboards; Türkiye Top 100 requires the project backend to provide the country-scoped list. See `play-store/LEADERBOARD_BACKEND.md`.

## V8 RC4 Gameplay Persistence
- Each gameplay mode keeps its own resumable local run snapshot.
- Returning to the menu saves board, tray, score, mode hazards, timed-mode remaining time and countdown bombs.
- Re-entering a mode resumes that mode automatically; game-over clears only that mode's run snapshot.
- Restart controls require confirmation and do not erase permanent Coins, Gems, level, achievements, cosmetics or account progression.
- Bomb blocks use a 5-move visible countdown and auto-explode.
- Adaptive block generation considers board pressure and progression while retaining randomness.
- Dragging a block highlights the actual merge target before drop.

## RC4.1 Hotfix
- Removed the duplicate in-game HUD restart button. Restart remains in the Pause menu with confirmation.
- Fixed Skin/Appearance shop previews so Classic, Neon, Candy, Dark, Gold and Space show their actual block colors and palette names.
- Added safe recovery for corrupted/incomplete per-mode run snapshots. If restore fails, only that mode's temporary run is cleared and a fresh run starts; permanent progression remains intact.


## RC5 Google Play compliance layer
- `@capacitor/app` added for native Android back-button / exit handling.
- Settings now includes Privacy & Data and deletion controls.
- `www/data-deletion.html` is a deletion-page template; it is **not a substitute for a real server deletion workflow** if online accounts are enabled.
- A public HTTPS Privacy Policy URL is still required before Production. Configure `CFG.RELEASE_PRIVACY_POLICY_URL` in `www/index.html`.
- If online accounts are enabled, configure `CFG.RELEASE_ACCOUNT_DELETION_URL` after publishing a working deletion page.
- Core gameplay is offline-capable; online services must fail gracefully.
