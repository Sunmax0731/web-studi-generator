# TODO

## Static Generator Foundation

- [x] Pivot from frontend authoring app to Codex-driven static site generator.
- [x] Add graphical usage guide image to README.
- [x] Store chat-provided research URLs as text/Markdown under `materials/` during a run.
- [x] Move processed materials from `materials/` to `studies/<study-id>/sources/` and leave `materials/` empty after a run.
- [x] Hide mock-test questions until the learner presses Start.
- [x] Support generated questions with image/figure blocks.
- [x] Remove answer-time category filter and show category as read-only question metadata.
- [x] Remove category icons/pill styling from study-unit rows.
- [x] Randomize question order on each attempt while keeping questions grouped by category.
- [x] Simplify the generated top page title to `資格試験学習ページ` with no explanatory subtitle.
- [x] Add `materials/` local source-document intake contract.
- [x] Add `studies/` registry, study config, units, and questions data contract.
- [x] Add sample generated content for 基本情報技術者試験, 色彩検定, and 狩猟免許（わな）.
- [x] Add `templates/` static CSS, favicon, and learner-side mock-test runtime.
- [x] Add `scripts/generate.mjs` to generate GitHub Pages files into `dist/`.
- [x] Support exam display settings in generated pages: one-question/multi-question, category, total time, font, and font size.
- [x] Allow learners to specify the number of questions for a mock-test attempt before starting.
- [x] Support learner metrics in generated pages: elapsed time, remaining time, average answer time, remaining question count, and per-question available time.
- [x] Support answer selection and correctness feedback for the six required question patterns.
- [x] Add GitHub Pages deployment workflow.
- [x] Add mock-test exam/study mode switching with deferred scoring, context-aware controls, and no-wrapping timer buttons.

## Validation And Release

- [x] Add unit tests for generator schema and exam metrics.
- [x] Add Playwright smoke test for generated static site.
- [x] Pass `npm run lint`.
- [x] Pass `npm test`.
- [x] Pass `npm run build`.
- [x] Pass `npm run e2e`.
- [x] Pass browser runtime gate with screenshots under `output/`.
- [x] Create docs ZIP with `npm run docs:zip`.
- [x] Commit and push to GitHub.
- [x] Confirm GitHub Pages workflow and published URL when feasible.

## Follow-Up Backlog

- [x] Expand the 狩猟免許 study from わな猟 only to 網猟、わな猟、第一種銃猟、第二種銃猟 exam variants with updated source-backed practice questions.
- [x] Expand the 狩猟免許 backing question pools beyond the 30-question syllabus count to 54 questions per license variant.
- [x] Expand the 基本情報技術者試験 study with IPA FE syllabus and recent mock-test source material.
- [x] Expand the 基本情報技術者試験 mock-test volume to 科目A 60 questions / 90 minutes and 科目B 20 questions / 100 minutes.
- [x] Expand the 基本情報技術者試験 question pool with additional past-exam-inspired practice questions for stronger randomization.
- [x] Randomize mock-test answer choice order and displayed symbols on each attempt.
- [x] Expand the 色彩検定 study with 3級・2級・1級1次・1級2次 exam variants using current source materials.
- [x] Validate 色彩検定 mock-test timings and question counts against recorded source evidence.
- [x] Group 色彩検定 learning units by grade on the generated study page.
- [ ] Add optional JSON schema files for editor tooling.
- [ ] Add a Codex URL intake log command that appends reviewed URLs to a selected study.
- [ ] Add link checker for generated pages.
- [ ] Add asset copying for study-specific images and diagrams.
- [ ] Add generated static page variants for printable study notes.
