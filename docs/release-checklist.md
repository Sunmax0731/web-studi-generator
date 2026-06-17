# Release Checklist

## Scope

- Expand 基本情報技術者試験 practice pools with past-exam-inspired original questions.
- Keep 科目A default attempt size at 60 questions while increasing its pool to 90 questions.
- Keep 科目B default attempt size at 20 questions while increasing its pool to 35 questions.
- Update schema validation so variant `questionCount` means minimum/default attempt size, not an exact pool size.
- Verify randomized attempts still honor the default counts and expanded maxima.
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
- [x] Commit created on `codex/expand-fe-question-pool`
- [x] Branch pushed
- [ ] `main` pushed for production reflection when requested or appropriate

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
