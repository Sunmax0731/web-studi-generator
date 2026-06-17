# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | Generator, templates, study data, and tests style check | Passed |
| Unit tests | `npm test` | Schema validation, exam metric helpers, FE/color variants, and 狩猟免許 4-variant pool counts | Passed: 3 tests |
| Static build | `npm run build` | Generate GitHub Pages files into `dist/` | Passed: 3 studies generated |
| E2E smoke | `npm run e2e` | Browser verification of generated static site, existing variants, per-attempt question-count selection, answer-symbol randomization, and 狩猟免許 variants | Passed: 5 Chromium tests |
| Runtime gate | Playwright fallback script | Open 狩猟免許 study and mock-test pages, verify desktop/mobile rendering and start interaction | Passed |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Passed |

## Runtime Gate

Required generated Web page gate for this task:

- Top page links the registered studies. Passed via E2E.
- 狩猟免許 study page opens at `/studies/trap-hunting/`. Passed.
- 狩猟免許 study page shows 4 mock-test choices: 網猟免許, わな猟免許, 第一種銃猟免許, 第二種銃猟免許. Passed.
- 狩猟免許 study page groups learning units by the 4 exam variants. Passed.
- 網猟免許 mock-test page opens at `/studies/trap-hunting/mock-test/ami-hunting/`. Passed.
- わな猟免許 mock-test page opens at `/studies/trap-hunting/mock-test/wana-hunting/`. Passed.
- 第一種銃猟免許 mock-test page opens at `/studies/trap-hunting/mock-test/type1-gun/`. Passed.
- 第二種銃猟免許 mock-test page opens at `/studies/trap-hunting/mock-test/type2-gun/`. Passed.
- Each 狩猟免許 variant defaults to 90 minutes and 30 questions from a 54-question pool. Passed.
- Each 狩猟免許 variant includes its own 猟具 question set. Passed.
- Questions are hidden until Start is pressed. Passed.
- Starting an attempt displays 30 questions. Passed.
- Category selector is absent during answering. Passed via existing E2E.
- Category is shown as read-only question metadata. Passed.
- Figure question renders in the わな猟 variant. Passed via generated content and existing figure checks.
- Desktop and mobile widths do not overlap or clip primary text. Passed at 1440x1000 and 390x900.
- Browser plugin path was attempted but `iab` was unavailable; Playwright fallback verified `/studies/trap-hunting/`, `/studies/trap-hunting/mock-test/type1-gun/`, and `/studies/trap-hunting/mock-test/ami-hunting/` with no console warnings/errors. Passed.

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
