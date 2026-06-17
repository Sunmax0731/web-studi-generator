# Release Checklist

## Scope

- Static site generator foundation.
- Source intake contract through `materials/` and chat-provided URLs.
- Study data contract under `studies/`.
- Generated GitHub Pages output under `dist/`.
- Sample generated studies for 基本情報技術者試験, 色彩検定, and 狩猟免許（わな）.

## Required Before Push

- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] `npm run e2e`
- [x] Runtime gate documented in `docs/qcds-evaluation.md`
- [x] `npm run docs:zip`
- [x] `git status --short --branch` reviewed
- [x] Commit created on `codex/static-site-generator-foundation`
- [x] Branch pushed
- [x] `main` pushed when release is requested

## Required After Main Push

- [x] GitHub Pages workflow completed
- [x] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
