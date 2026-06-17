# Release Checklist

## Scope

- Add a question-count setting to generated mock-test pages.
- Default the setting to each mock-test variant's configured question count.
- Clamp requested question counts between 1 and the available generated questions.
- Randomly sample the requested number of questions at Start while preserving category-grouped display.
- Verify multi-question and single-question modes with reduced question counts.
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
- [x] Commit created on `codex/question-count-setting`
- [x] Branch pushed
- [x] `main` pushed for production reflection when requested or appropriate

## Required After Main Push

- [x] GitHub Pages workflow completed
- [x] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
