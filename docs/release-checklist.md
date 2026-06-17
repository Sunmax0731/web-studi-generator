# Release Checklist

## Scope

- MVP foundation for arbitrary study-page and mock-test generation.
- Sample themes for 基本情報技術者試験, 色彩検定, and 狩猟免許（わな）.
- React/Vite app with unit and browser smoke tests.

## Required Before Push

- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] `npm run e2e`
- [x] Browser runtime gate documented in `docs/qcds-evaluation.md`
- [x] `npm run docs:zip`
- [x] `git status --short --branch` reviewed before release
- [x] Commit created on `codex/study-generator-foundation`
- [x] Public GitHub remote `origin` configured
- [x] Branch pushed

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
