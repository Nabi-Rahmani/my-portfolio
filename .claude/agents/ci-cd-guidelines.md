# CI/CD Guidelines (Flutter Android -> Google Play)

This repo uses a self-hosted macOS ARM64 runner and a GitHub Actions workflow to
build a signed Android App Bundle (AAB) and upload it to Google Play.

## Initial setup (one time)

- Play Console:
  - Add the service account **email** to the target app with the needed role
    (Release Manager or higher).
- GitHub:
  - Add the JSON key to secrets as `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`.
  - If you use environments (dev/stg/prod), add the JSON key to the matching
    environment as well.
- Android signing:
  - Create an **upload keystore** (`.jks`).
  - Base64-encode the `.jks` and store it as `ANDROID_KEYSTORE_JKS`.
  - Store `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`,
    `ANDROID_KEY_PASSWORD` as secrets (repo or environment).

## Workflow

- File: `.github/workflows/build-upload.yaml`
- Trigger: push to `master` and `workflow_dispatch`
- Job: `build-android`
- Environment: `prod`
- Track: `production`
- Package: `com.nabirahmani.dev_discipline`
- AAB: `build/app/outputs/bundle/prodRelease/app-prod-release.aab`

To switch to internal testing, set `TRACK="internal"` in the workflow.

## Self-hosted runner (macOS)

- Keep the runner in a path with **no spaces** (e.g.
  `/Users/nabirahmani/actions-runner`).
- Start it with:
  - `./run.sh`
- It must show: `Listening for Jobs`.
- Runner work folder must be `_work` (not `run.sh`).
- Do not run multiple sessions at once.

## Required secrets (repo or prod environment)

- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` (raw JSON, not base64)
- `ANDROID_KEYSTORE_JKS` (base64 of upload keystore `.jks`) run in terminal:
  `base64 -i /Users/nabirahmani/upload-keystore.jks | tr -d '\n' | pbcopy` put
  data in secret
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`
- Optional: `DART_DEFINES` (base64 of `.env.prod`)

If the `prod` environment has approvals or branch restrictions, approve the
deployment or allow `master`.

## Signing

The workflow generates:

- `android/android_keystore.jks` (from `ANDROID_KEYSTORE_JKS`)
- `android/key.properties` (with absolute `storeFile` path)

Do not commit keystores or `android/key.properties` (already gitignored).

## Versioning

Google Play shows `versionName` from `pubspec.yaml`. Always bump `versionCode`
(the `+N` part) before each upload:

```
version: 1.0.1+7
```

## Common failures

- **No logs / instant fail**: runner offline, environment approval pending, or
  runner work folder misconfigured.
- **/Users/.../New: No such file or directory**: runner path contains spaces;
  move runner to a path without spaces.
- **base64: invalid input**: bad `ANDROID_KEYSTORE_JKS` value or wrong decode
  flag. On macOS use `base64 -D` in the workflow.
- **Upload errors**: package name or track does not match Play Console app.

## Safety

- Never commit runner files (keep `actions-runner/` out of git).
- Never store keystore contents in source control.
