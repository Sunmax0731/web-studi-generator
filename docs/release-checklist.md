# Release Checklist

## Scope

- Move key mock-test metrics into the sticky left pane so elapsed time, average answer time, remaining time, unanswered count, and per-question remaining time stay visible while scrolling.
- Display the registered question pool count for the current mock-test variant.
- Add a scored-review setting that shows only incorrectly answered questions after scoring.
- Preserve existing exam/study answer modes, scoring, and responsive behavior.
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
- [x] Commit created on `codex/mock-test-persistent-metrics-review-filter`
- [x] Branch pushed
- [ ] `main` pushed for production reflection when requested or appropriate

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
