# Release Checklist

## Scope

- Expand the 狩猟免許 study from わな猟 only to four exam variants: 網猟免許, わな猟免許, 第一種銃猟免許, 第二種銃猟免許.
- Record the requested allowed hunting tools in `study.config.json` variant descriptions.
- Update the 狩猟免許 backing pool to 54 questions per variant while keeping the default attempt size at 30 questions.
- Archive user-provided source links and syllabus PDF from `materials/` to `studies/trap-hunting/sources/`.
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
- [x] Commit created on `codex/update-hunting-license-exams`
- [x] Branch pushed
- [ ] `main` pushed for production reflection when requested or appropriate

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
