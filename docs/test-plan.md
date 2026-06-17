# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | Generator, templates, study data, and tests style check | Passed |
| Unit tests | `npm test` | Schema validation, exam metric helpers, FE/color variants, and 狩猟免許 4-variant pool counts | Passed: 3 tests |
| Static build | `npm run build` | Generate GitHub Pages files into `dist/` | Passed: 3 studies generated |
| E2E smoke | `npm run e2e` | Browser verification of generated static site, existing variants, exam/study answer modes, per-attempt question-count selection, answer-symbol randomization, and 狩猟免許 variants | Passed: 6 Chromium tests |
| Runtime gate | Playwright fallback script | Open generated mock-test page, verify desktop/mobile rendering, context-aware controls, exam scoring, study feedback, and button wrapping | Passed |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Passed |

## Runtime Gate

Required generated Web page gate for this task:

- Mock-test page opens at `/studies/basic-info/mock-test/kamoku-a/`. Passed.
- Questions are hidden until Start is pressed. Passed.
- Removed the randomization note from the mock-test start message. Passed.
- Removed the requested static mock-test phrase from the 狩猟免許 study page description. Passed.
- Pause and reset buttons are disabled before an attempt starts. Passed.
- Previous and next buttons are disabled at the first/last single-question pages. Passed via E2E.
- Pause and reset labels keep `white-space: nowrap` and stay on one line at desktop and 390px mobile widths. Passed.
- Default exam mode hides feedback until all questions are answered and the learner presses 採点する. Passed.
- Exam mode displays score and pass/fail after scoring, then locks answered choices. Passed.
- Study mode shows answer feedback immediately after selection. Passed.
- Desktop and mobile widths do not overlap or clip primary text. Passed at 1440x1000 and 390x900.
- Browser plugin path was attempted but `iab` was unavailable; Playwright fallback verified the generated mock-test page with no console warnings/errors. Passed.

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
- The 狩猟免許 mock questions are original practice questions based on public syllabus and public-question themes, not verbatim copies of published question booklets.
- Inline generated figures are supported for registered figure kinds. Study-specific uploaded image asset copying is still a follow-up.
