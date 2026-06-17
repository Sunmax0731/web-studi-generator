# Release Checklist

## Scope

- Add a mock-test answer mode setting:
  - 試験モード: hide answer feedback until all questions are answered and the learner presses 採点する.
  - 勉強モード: show answer feedback immediately after selection.
- Display score and pass/fail after exam-mode scoring.
- Disable unavailable controls according to attempt state: pause, reset, score, previous, and next.
- Keep 一時停止 and リセット labels on one line at desktop and mobile widths.
- Remove the requested explanatory text from the mock-test start card and 狩猟免許 study description.
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
- [x] Commit created on `codex/mock-test-mode-controls`
- [x] Branch pushed
- [x] `main` pushed for production reflection when requested or appropriate

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
