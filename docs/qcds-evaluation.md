# QCDS Evaluation

Date: 2026-06-17

## Rating Scale

Only these exact ratings are allowed:

`S+`, `S-`, `A+`, `A-`, `B+`, `B-`, `C+`, `C-`, `D+`, `D-`

## Evaluation

| Area | Rating | Evidence |
| --- | --- | --- |
| Quality | A- | 色彩検定 now has 3級・2級・1級1次・1級2次 variants with source-aligned times and question counts, and learning units are grouped by grade. `npm run lint`, `npm test`, `npm run build`, and `npm run e2e` passed. |
| Cost | A- | The solution remains static JSON plus Node generation with no backend hosting or crawler dependency. |
| Delivery | A- | The existing `examVariants` path is reused, and 色彩検定 sources were archived from `materials/` into `studies/color-test/sources/`. |
| Satisfaction | A- | The requested 3級・2級・1級 mock exams are selectable from the 色彩検定 page, with Start-hidden questions, answer feedback, timing controls, and read-only category metadata. |

## Runtime Gate

Status: Passed

Required generated Web page gate:

- Top page, FE study page, and FE 科目A/科目B mock-test pages visible: passed.
- 科目A: 90 minutes, 60 questions: passed.
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
- Mock-test settings and answer interaction verified: passed.
- Responsive desktop and mobile widths checked at 1440x1000 and 390x900: passed.

## Notes

- Runtime artifacts remain under ignored `output/` paths.
- The generated `dist/` directory remains ignored and should not be committed.
