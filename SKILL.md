# SKILL

Use this workflow when changing `web-studi-generator`.

## Start Order

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read this `SKILL.md`.
4. Review `docs/design.md` and `docs/test-plan.md` when UI, workflow, or validation changes.
5. Check `TODO.md` and add same-granularity items for newly discovered work before implementing them.

## Implementation Guidance

- Keep study-domain data in `src/data/` and reusable logic in `src/lib/`.
- Keep mock-test timing, answer, and category behavior testable as pure functions where possible.
- Use React state for MVP interactions; introduce persistence only when the workflow requires it.
- Prefer compact tool UI over marketing pages.
- Treat Japanese text as UTF-8 source content; do not rewrite apparent mojibake without checking encoding.

## Validation Workflow

Run these before release:

```powershell
npm run lint
npm test
npm run build
npm run e2e
npm run docs:zip
```

For browser QA, verify:

- App is not blank.
- Three sample themes are visible and switchable.
- Category filter changes the mock-test question set.
- One-question and multi-question modes both render.
- Answer selection changes feedback and timing metrics remain visible.
- Desktop and mobile widths do not overlap or clip primary text.

## Artifacts

- Commit source, docs, tests, and stable design references.
- Keep runtime captures under `output/`.
- Keep generated docs ZIP under `release/`; it is ignored by Git.
