# Release Checklist

## Scope

- Stack the mock-test settings/status panel above the answer panel on desktop and mobile.
- Hide setup-only controls during active attempts while keeping timing, pause/reset, scoring, and review controls available.
- Move the study-page return link into the settings/status panel header.
- Set 色彩検定 default attempt counts from official answer structure: 3級15問, 2級17問, 1級1次16問, 1級2次5問, while keeping registered pool counts visible.
- Update `SKILL.md` so production reflection is the default completion path after successful validation.
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
- [ ] Commit created on `codex/mock-test-top-panel-production-default`
- [ ] Branch pushed
- [ ] `main` pushed for production reflection

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
