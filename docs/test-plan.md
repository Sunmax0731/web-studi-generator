# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | TypeScript/React style and obvious code issues | Passed |
| Unit tests | `npm test` | Exam metrics, duration formatting, category filtering, answer correctness | Passed: 1 file, 5 tests |
| Production build | `npm run build` | TypeScript build and Vite production bundle | Passed |
| E2E smoke | `npm run e2e` | Browser render and primary mock-test workflow | Passed: 1 Chromium test |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Passed |

## Runtime Gate

Platform runtime gate for Web apps:

- Open in Chrome or headless browser. Passed with Playwright Chromium after Browser plugin `iab` was unavailable.
- Confirm non-blank rendering. Passed on desktop 1440x1000 and mobile 390x900.
- Confirm major elements: theme rail, generator blueprint, question pattern matrix, settings panel, timing metrics, mock-test preview. Passed by DOM counts and screenshots.
- Exercise the primary workflow. Passed:
  1. Load app.
  2. Switch to 色彩検定.
  3. Change to 1問 display.
  4. Filter category to 配色.
  5. Select all correct choices in the multiple-select question.
  6. Confirm correctness feedback appears.
- Check one mobile-width render for layout overflow. Passed by screenshot review.

## Manual Scenarios

- Basic information technology theme shows technology, management, and strategy categories.
- Hunting trap license theme shows law, animal identification, and trap safety categories.
- Multi-question mode displays more than one question when the filtered theme has multiple questions.
- Remaining time and per-question available time update when elapsed time changes.

## Known Test Boundaries

- MVP does not fetch or parse external pages/PDFs yet.
- MVP uses seeded sample content for the three requested themes.
- Generated diagrams/illustrations are represented by visual hints, not production illustration assets.
