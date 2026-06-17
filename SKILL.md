# SKILL

Use this workflow when changing or using `web-studi-generator`.

## Start Order

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read this `SKILL.md`.
4. Review `docs/materials.md`, `docs/generation-format.md`, and `docs/publishing.md`.
5. Check `TODO.md` and add same-granularity items for newly discovered work before implementing them.

## Source Intake Workflow

1. User places local documents under `materials/<study-id>/`.
2. User sends Web page URLs in chat.
3. Codex reads local documents and browses URLs when needed.
4. Codex records sources in `studies/<study-id>/study.config.json`.
5. Codex updates:
   - `studies/<study-id>/data/units.json`
   - `studies/<study-id>/data/questions.json`
6. Codex runs `npm run generate`.
7. Codex validates the generated static site and pushes to `main` when release is requested.

## Implementation Guidance

- Do not rebuild this as a frontend authoring app.
- Keep generator logic in `scripts/`.
- Keep static templates in `templates/`.
- Keep source materials in `materials/`.
- Keep publishable generated output in `dist/`; it is ignored by Git.
- Validate study data before rendering.
- Generated mock-test pages may use small vanilla JavaScript for learner-side settings, timing, answering, and scoring.
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

- Top page is not blank.
- All registered studies are linked.
- A study page shows units and sources.
- A mock-test page opens.
- Display mode, category, total time, font, and font size controls work.
- Answer selection shows feedback.
- Remaining time, average answer time, and remaining-question pace are visible.
- Desktop and mobile widths do not overlap or clip primary text.

## GitHub Pages

- Push to `main` triggers `.github/workflows/pages.yml`.
- The workflow deploys `dist/` to GitHub Pages.
- After push, confirm the workflow completes and the published URL returns HTTP 200 when feasible.
