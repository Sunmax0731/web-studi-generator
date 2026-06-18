# Release Checklist

## Scope

- Restore color-test written-style mock-test defaults to 100 questions.
- Add enough 3級 practice questions for the 100-question default to validate.
- Keep 1級2次 on its practical 5-question default.
- Record the source review used for the 100-question decision.
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
- [x] Commit created on `codex/color-test-default-100`
- [x] Branch pushed
- [x] `main` pushed for production reflection

## Required After Main Push

- [x] GitHub Pages workflow completed
- [x] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
