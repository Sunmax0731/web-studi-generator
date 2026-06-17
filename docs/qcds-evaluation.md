# QCDS Evaluation

Date: 2026-06-18

## Rating Scale

Only these exact ratings are allowed:

`S+`, `S-`, `A+`, `A-`, `B+`, `B-`, `C+`, `C-`, `D+`, `D-`

## Evaluation

| Area | Rating | Evidence |
| --- | --- | --- |
| Quality | A- | 基本情報技術者試験 now has expanded backing pools: 科目A 90 questions for 60-question attempts and 科目B 35 questions for 20-question attempts. Schema validation now allows pools larger than the default attempt size, and `npm run lint`, `npm test`, `npm run build`, and `npm run e2e` passed. |
| Cost | A- | The solution remains static JSON plus Node generation with no backend hosting or crawler dependency. |
| Delivery | A- | The existing study JSON and generator schema were extended without adding dependencies or changing the static publishing model. |
| Satisfaction | A- | Learners still default to the official 60/20-question attempt sizes, but repeated attempts now sample from a larger FE practice pool for better randomization. |

## Runtime Gate

Status: Passed

Required generated Web page gate:

- Top page, FE study page, and FE 科目A/科目B mock-test pages visible: passed.
- 科目A: 90 minutes, default 60 questions, 90-question pool: passed.
- 科目A question-count setting defaults to 60 and can start 10-question and 3-question attempts: passed.
- 科目B: 100 minutes, default 20 questions, 35-question pool: passed.
- 色彩検定 3級: 60 minutes, 97 questions: passed.
- 色彩検定 2級: 70 minutes, 104 questions: passed.
- 色彩検定 1級1次: 80 minutes, 109 questions: passed.
- 色彩検定 1級2次: 90 minutes, 31 questions: passed.
- 色彩検定 learning units grouped by grade: passed.
- Questions hidden until Start: passed.
- Figure/image question render in 科目A: passed.
- Answer choice order and displayed A/B/C/D symbols randomize per attempt: passed.
- Category selector absent during answering: passed.
- Read-only category metadata visible while solving: passed.
- Mock-test display, timing, question-count settings, and answer interaction verified: passed.
- Responsive desktop and mobile widths checked at 1440x1000 and 390x900: passed.
- Browser plugin path attempted but `iab` was unavailable; Playwright fallback verified 科目A default 60 from max 90 and 科目B max 35 with no console warnings/errors: passed.

## Notes

- Runtime artifacts remain under ignored `output/` paths.
- The generated `dist/` directory remains ignored and should not be committed.
