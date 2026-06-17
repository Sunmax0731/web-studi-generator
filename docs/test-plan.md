# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | Generator, templates, and tests style check | Passed |
| Unit tests | `npm test` | Schema validation, exam metric helpers, and FE variant counts | Passed: 3 tests |
| Static build | `npm run build` | Generate GitHub Pages files into `dist/` | Passed: 3 studies generated |
| E2E smoke | `npm run e2e` | Browser verification of generated static site and FE 科目A/科目B mock-test interaction | Passed: 1 Chromium test |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Pending for the current task |

## Runtime Gate

Required generated Web page gate for this task:

- Top page is non-blank and links the registered studies. Passed.
- Basic information study page shows 5 units and recorded local/web sources. Passed.
- Basic information study page shows 科目A and 科目B mock-test choices. Passed.
- 科目A mock-test page opens at `/studies/basic-info/mock-test/kamoku-a/`. Passed.
- 科目A has 90 minutes and 60 questions. Passed.
- 科目B mock-test page opens at `/studies/basic-info/mock-test/kamoku-b/`. Passed.
- 科目B has 100 minutes and 20 questions. Passed.
- Questions are hidden until Start is pressed. Passed.
- Display mode, total time, and font size controls work. Passed.
- Category selector is absent during answering. Passed.
- Category is shown as read-only question metadata. Passed.
- Figure question renders in 科目A. Passed.
- Answer selection shows correctness feedback. Passed.
- Remaining time, average answer time, and remaining-question pace are visible. Passed.
- Desktop and mobile widths do not overlap or clip primary text. Passed at 1440x1000 and 390x900.

Runtime screenshots are stored under ignored `output/fe-variant-runtime/`.

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
- Inline generated figures are supported for registered figure kinds. Study-specific uploaded image asset copying is still a follow-up.
