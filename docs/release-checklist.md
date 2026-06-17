# Release Checklist

## Scope

- Expand 色彩検定 with 3級・2級・1級1次・1級2次 mock-test variants.
- Set 色彩検定 3級 as 60 minutes / 97 questions.
- Set 色彩検定 2級 as 70 minutes / 104 questions.
- Set 色彩検定 1級1次 as 80 minutes / 109 questions.
- Set 色彩検定 1級2次 as 90 minutes / 31 questions.
- Archive processed `materials/` input under `studies/color-test/sources/`.
- Keep generated GitHub Pages output under ignored `dist/`.

## Required Before Push

- [x] `materials/` remains empty or absent.
- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] `npm run e2e`
- [x] Runtime gate documented in `docs/qcds-evaluation.md`
- [x] `npm run docs:zip`
- [x] `git status --short --branch` reviewed
- [x] Commit created on `codex/color-test-exam-variants`
- [x] Branch pushed
- [ ] `main` pushed for production reflection when requested or appropriate

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
