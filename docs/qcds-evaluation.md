# QCDS Evaluation

Date: 2026-06-18

## Rating Scale

Only these exact ratings are allowed:

`S+`, `S-`, `A+`, `A-`, `B+`, `B-`, `C+`, `C-`, `D+`, `D-`

## Evaluation

| Area | Rating | Evidence |
| --- | --- | --- |
| Quality | A- | 狩猟免許 study now covers 網猟、わな猟、第一種銃猟、第二種銃猟 as separate exam variants. Each variant defaults to 30 questions and 90 minutes, backed by a 54-question pool with license-specific 猟具 questions. `npm run lint`, `npm test`, `npm run build`, and `npm run e2e` passed. |
| Cost | A- | The solution remains static JSON plus Node generation with no backend, crawler, or runtime service dependency. |
| Delivery | A- | Existing `examVariants` support was reused; source materials were archived under `studies/trap-hunting/sources/`, and `materials/` was left empty. |
| Satisfaction | A- | Learners can choose the requested license genre and run a mock test aligned to the 30-question, 90-minute knowledge-test format while repeated attempts draw from a larger 54-question pool. |

## Runtime Gate

Status: Passed

Required generated Web page gate:

- 狩猟免許 study page visible at `/studies/trap-hunting/`: passed.
- Four mock-test choices visible: 網猟免許, わな猟免許, 第一種銃猟免許, 第二種銃猟免許: passed.
- Variant learning-unit groups visible: passed.
- 網猟免許 mock-test page opens and starts with 30 questions from a 54-question pool: passed.
- わな猟免許 mock-test page opens and has its own 猟具/標識 content: passed.
- 第一種銃猟免許 mock-test page opens and starts with 30 questions from a 54-question pool: passed.
- 第二種銃猟免許 mock-test page opens and starts with 30 questions from a 54-question pool: passed.
- Each variant defaults to 90 minutes and 30 questions with max question count 54: passed.
- Questions are hidden until Start: passed.
- Read-only category metadata visible while solving: passed.
- Mock-test display, timing, question-count settings, and answer interaction verified by E2E: passed.
- Responsive desktop and mobile widths checked at 1440x1000 and 390x900: passed.
- Browser plugin path attempted but `iab` was unavailable; Playwright fallback verified the 狩猟免許 study, 第一種銃猟 started state, and 網猟 mobile started state with no console warnings/errors: passed.

## Notes

- Runtime artifacts remain under ignored `output/` paths.
- The generated `dist/` directory remains ignored and should not be committed.
- 狩猟免許 practice questions are original questions based on public syllabus and public-question themes, not verbatim copies of published question listings.
