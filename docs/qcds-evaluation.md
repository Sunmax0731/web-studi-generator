# QCDS Evaluation

Date: 2026-06-18

## Rating Scale

Only these exact ratings are allowed:

`S+`, `S-`, `A+`, `A-`, `B+`, `B-`, `C+`, `C-`, `D+`, `D-`

## Evaluation

| Area | Rating | Evidence |
| --- | --- | --- |
| Quality | A- | Mock-test pages now keep status/action controls sticky while scrolling, save scored attempts to browser-local history, and visualize accuracy/time/category trends while preserving the stacked exam layout. `npm run lint`, `npm test`, `npm run build`, and `npm run e2e` passed. |
| Cost | A- | The solution remains static JSON plus Node generation with no backend, crawler, or runtime service dependency. |
| Delivery | A- | Existing generated HTML/CSS/vanilla runtime patterns were reused; the change stays scoped to templates, runtime, tests, and docs. |
| Satisfaction | A- | Learners can reach timing and action controls while answering long tests, then review and compare past results with simple charts on the same static page. |

## Runtime Gate

Status: Passed

Required generated Web page gate:

- 基本情報技術者試験 科目A mock-test page visible at `/studies/basic-info/mock-test/kamoku-a/`: passed.
- Questions remain hidden until Start: passed.
- Settings/status and answering areas are stacked vertically: passed.
- Registered question count and key timing/progress metrics stay visible in the top settings/status panel: passed.
- Setup-only controls are hidden during active attempts: passed.
- Status/action controls stay sticky during question scrolling: passed.
- Scored attempt history is saved locally and rendered after scoring: passed.
- Accuracy trend, answer-time, and category accuracy charts render after scoring: passed.
- 色彩検定 default counts are 3級15, 2級17, 1級1次16, 1級2次5: passed.
- Incorrect-only review is disabled before scoring and filters to wrong answers after scoring: passed.
- Removed randomization note from the mock-test start message: passed.
- Removed the requested static mock-test phrase from the 狩猟免許 study page description: passed.
- Pause, reset, score, previous, and next controls disable according to the current attempt state: passed.
- Pause and reset labels remain on one line at 1440x1000 and 390x900: passed.
- Exam mode defers feedback until all questions are answered and scored: passed.
- Scoring displays score and pass/fail and locks answer choices: passed.
- Study mode shows immediate feedback after answer selection: passed.
- Browser plugin path attempted but `iab` was unavailable; Playwright fallback verified desktop/mobile states with no console warnings/errors: passed.

## Notes

- Runtime artifacts remain under ignored `output/` paths.
- The generated `dist/` directory remains ignored and should not be committed.
- Runtime screenshots and preview logs remain under ignored `output/` paths.
