# TODO

## Static Generator Foundation

- [x] Pivot from frontend authoring app to Codex-driven static site generator.
- [x] Add `materials/` local source-document intake contract.
- [x] Add `studies/` registry, study config, units, and questions data contract.
- [x] Add sample generated content for 基本情報技術者試験, 色彩検定, and 狩猟免許（わな）.
- [x] Add `templates/` static CSS, favicon, and learner-side mock-test runtime.
- [x] Add `scripts/generate.mjs` to generate GitHub Pages files into `dist/`.
- [x] Support exam display settings in generated pages: one-question/multi-question, category, total time, font, and font size.
- [x] Support learner metrics in generated pages: elapsed time, remaining time, average answer time, remaining question count, and per-question available time.
- [x] Support answer selection and correctness feedback for the six required question patterns.
- [x] Add GitHub Pages deployment workflow.

## Validation And Release

- [x] Add unit tests for generator schema and exam metrics.
- [x] Add Playwright smoke test for generated static site.
- [x] Pass `npm run lint`.
- [x] Pass `npm test`.
- [x] Pass `npm run build`.
- [x] Pass `npm run e2e`.
- [x] Pass browser runtime gate with screenshots under `output/`.
- [x] Create docs ZIP with `npm run docs:zip`.
- [ ] Commit and push to GitHub.
- [ ] Confirm GitHub Pages workflow and published URL when feasible.

## Follow-Up Backlog

- [ ] Add optional JSON schema files for editor tooling.
- [ ] Add a Codex URL intake log command that appends reviewed URLs to a selected study.
- [ ] Add link checker for generated pages.
- [ ] Add asset copying for study-specific images and diagrams.
- [ ] Add generated static page variants for printable study notes.
