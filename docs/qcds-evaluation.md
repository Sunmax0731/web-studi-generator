# QCDS Evaluation

Date: 2026-06-17

## Rating Scale

Only these exact ratings are allowed:

`S+`, `S-`, `A+`, `A-`, `B+`, `B-`, `C+`, `C-`, `D+`, `D-`

## Evaluation

| Area | Rating | Evidence |
| --- | --- | --- |
| Quality | A- | Mock-test pages now expose a Start-time question-count setting that defaults to each variant's configured count, clamps to available questions, and is covered by Playwright E2E. `npm run lint`, `npm test`, `npm run build`, and `npm run e2e` passed. |
| Cost | A- | The solution remains static JSON plus Node generation with no backend hosting or crawler dependency. |
| Delivery | A- | The existing generated settings panel and vanilla runtime were extended without adding dependencies or changing the static publishing model. |
| Satisfaction | A- | Learners can choose a shorter or full-size attempt before pressing Start, while existing display, timing, answer feedback, and category metadata behavior remain intact. |

## Runtime Gate

Status: Passed

Required generated Web page gate:

- Top page, FE study page, and FE 科目A/科目B mock-test pages visible: passed.
- 科目A: 90 minutes, 60 questions: passed.
- 科目A question-count setting defaults to 60 and can start 10-question and 3-question attempts: passed.
- 科目B: 100 minutes, 20 questions: passed.
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
- Browser plugin path attempted but `iab` was unavailable; Playwright fallback verified desktop 7-question and mobile 5-question attempts with no console warnings/errors: passed.

## Notes

- Runtime artifacts remain under ignored `output/` paths.
- The generated `dist/` directory remains ignored and should not be committed.
