# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | Generator, templates, and tests style check | Passed |
| Unit tests | `npm test` | Schema validation, exam metric helpers, FE variant counts, and 色彩検定 variant counts | Passed: 3 tests |
| Static build | `npm run build` | Generate GitHub Pages files into `dist/` | Passed: 3 studies generated |
| E2E smoke | `npm run e2e` | Browser verification of generated static site, FE variants, 色彩検定 variants, per-attempt question-count selection, and answer-symbol randomization | Passed: 4 Chromium tests |
| Runtime gate | Playwright fallback script | Open generated mock-test page, set question count, start attempt, check desktop/mobile rendering and console health | Passed |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Passed |

## Runtime Gate

Required generated Web page gate for this task:

- Top page is non-blank and links the registered studies. Passed.
- Basic information study page shows 5 units and recorded local/web sources. Passed.
- Basic information study page shows 科目A and 科目B mock-test choices. Passed.
- 科目A mock-test page opens at `/studies/basic-info/mock-test/kamoku-a/`. Passed.
- 科目A has 90 minutes and 60 questions. Passed.
- 科目A question-count setting defaults to 60 and can start an attempt with 10 questions. Passed.
- 科目A single-question mode respects a 3-question attempt and shows `1 / 3` in the pager. Passed.
- 科目B mock-test page opens at `/studies/basic-info/mock-test/kamoku-b/`. Passed.
- 科目B has 100 minutes and 20 questions. Passed.
- 色彩検定 study page shows 4 mock-test choices: 3級, 2級, 1級1次, 1級2次. Passed.
- 色彩検定 study page groups learning units by 3級, 2級, 1級1次, and 1級2次. Passed.
- 色彩検定 3級 mock-test page opens at `/studies/color-test/mock-test/grade-3/`. Passed.
- 色彩検定 3級 has 60 minutes and 97 questions. Passed.
- 色彩検定 2級 mock-test page opens at `/studies/color-test/mock-test/grade-2/`. Passed.
- 色彩検定 2級 has 70 minutes and 104 questions. Passed.
- 色彩検定 1級1次 mock-test page opens at `/studies/color-test/mock-test/grade-1-first/`. Passed.
- 色彩検定 1級1次 has 80 minutes and 109 questions. Passed.
- 色彩検定 1級2次 mock-test page opens at `/studies/color-test/mock-test/grade-1-second/`. Passed.
- 色彩検定 1級2次 has 90 minutes and 31 questions, shown in single-question mode with pager. Passed.
- Questions are hidden until Start is pressed. Passed.
- Display mode, total time, question count, and font size controls work. Passed.
- Category selector is absent during answering. Passed.
- Category is shown as read-only question metadata. Passed.
- Figure question renders in 科目A. Passed.
- Answer choice order and displayed A/B/C/D symbols are randomized per attempt. Passed.
- Answer selection shows correctness feedback. Passed.
- Remaining time, average answer time, and remaining-question pace are visible. Passed.
- Desktop and mobile widths do not overlap or clip primary text. Passed at 1440x1000 and 390x900.
- Browser plugin path was attempted but `iab` was unavailable; Playwright fallback verified `/studies/basic-info/mock-test/kamoku-a/` with 7 desktop questions and 5 mobile questions, no console warnings/errors, and no framework overlay. Passed.

Runtime screenshots are stored under ignored `output/playwright/`.

## Manual Scenario For Future Source Intake

1. Place local files and URL notes under `materials/`.
2. Send the same Web page URLs in chat and instruct Codex to run generation.
3. Codex reads sources and updates `studies/<study-id>/`.
4. Move processed materials to `studies/<study-id>/sources/` and leave `materials/` empty.
5. Run `npm run build`.
6. Review generated pages.
7. Push the task branch, and push or merge to `main` when release is requested.

## Known Boundaries

- Source reading is performed by Codex during the session, not by a committed crawler.
- PDF/web extraction adapters are not automated CLI commands yet.
- The FE mock questions are original practice questions based on syllabus and public-question themes, not verbatim copies of published question booklets.
- The 色彩検定 mock questions are original practice questions based on the official level guide, public examples, and public model-answer structure, not verbatim copies of published question booklets.
- Inline generated figures are supported for registered figure kinds. Study-specific uploaded image asset copying is still a follow-up.
