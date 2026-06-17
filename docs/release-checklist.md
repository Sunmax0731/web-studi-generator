# Release Checklist

## Scope

- Randomize mock-test answer choice order and displayed A/B/C/D symbols on each attempt.
- Keep existing 基本情報技術者試験 科目A as 90 minutes / 60 questions.
- Keep existing 基本情報技術者試験 科目B as 100 minutes / 20 questions.
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
- [x] Commit created on `codex/randomize-answer-symbols`
- [x] Branch pushed
- [x] `main` pushed for production reflection

## Required After Main Push

- [x] GitHub Pages workflow completed
- [x] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
