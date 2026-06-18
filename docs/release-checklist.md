# Release Checklist

## Scope

- Keep mock-test status metrics and action buttons sticky/reachable while learners scroll through questions.
- Persist scored exam attempts in browser-local history per mock-test page.
- Render saved results with accuracy trend, answer-time, and category accuracy charts.
- Preserve setup-control hiding during active attempts and existing exam/study/review behavior.
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
- [x] Commit created on `codex/mock-test-sticky-history-charts`
- [x] Branch pushed
- [x] `main` pushed for production reflection

## Required After Main Push

- [x] GitHub Pages workflow completed
- [x] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
