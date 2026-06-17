# QCDS Evaluation

Date: 2026-06-17

## Rating Scale

Only these exact ratings are allowed:

`S+`, `S-`, `A+`, `A-`, `B+`, `B-`, `C+`, `C-`, `D+`, `D-`

## Evaluation

| Area | Rating | Evidence |
| --- | --- | --- |
| Quality | A- | FE now has separate 科目A and 科目B mock-test variants, with data validation enforcing 科目A 60 questions / 90 minutes and 科目B 20 questions / 100 minutes. `npm run lint`, `npm test`, `npm run build`, `npm run e2e`, and Playwright runtime screenshots passed. |
| Cost | A- | The solution remains static JSON plus Node generation with no backend hosting or crawler dependency. |
| Delivery | A- | The generator now supports optional `examVariants`, and the FE study uses it for production-form practice. |
| Satisfaction | A- | The requested official question counts and durations are represented directly in generated mock-test pages. |

## Runtime Gate

Status: Passed

Required generated Web page gate:

- Top page, FE study page, and FE 科目A/科目B mock-test pages visible: passed.
- 科目A: 90 minutes, 60 questions: passed.
- 科目B: 100 minutes, 20 questions: passed.
- Questions hidden until Start: passed.
- Figure/image question render in 科目A: passed.
- Category selector absent during answering: passed.
- Read-only category metadata visible while solving: passed.
- Mock-test settings and answer interaction verified: passed.
- Responsive desktop and mobile widths checked at 1440x1000 and 390x900: passed.

## Notes

- Runtime screenshots are stored in ignored `output/fe-variant-runtime/` artifacts.
- The generated `dist/` directory remains ignored and should not be committed.
