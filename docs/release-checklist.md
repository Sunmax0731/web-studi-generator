# Release Checklist

## Scope

- Expand the existing 基本情報技術者試験 study using `materials/ipa-FE`.
- Add IPA FE syllabus and recent public-question URLs as recorded sources.
- Replace unreadable basic-info sample text with readable Japanese study data.
- Generate 5 FE-aligned units and 18 original mock-test questions across テクノロジ, アルゴリズムとプログラミング, セキュリティ, マネジメント, and ストラテジ.
- Keep generated GitHub Pages output under ignored `dist/`.

## Required Before Push

- [x] `materials/ipa-FE` reviewed.
- [x] Processed materials archived to `studies/basic-info/sources/`.
- [x] `materials/` left empty.
- [x] `npm run lint`
- [x] `npm test`
- [x] `npm run build`
- [x] `npm run e2e`
- [x] Runtime gate documented in `docs/qcds-evaluation.md`
- [x] `npm run docs:zip`
- [x] `git status --short --branch` reviewed
- [x] Commit created on `codex/add-fe-mock-questions`
- [x] Branch pushed

## Required After Main Push

- [ ] GitHub Pages workflow completed
- [ ] Published URL returns HTTP 200 when feasible

## Release Artifact

- `release/web-studi-generator-docs.zip`

The release ZIP is ignored by Git and should be regenerated for each release candidate.
