# SKILL

Use this workflow when changing or using `web-studi-generator`.

## Start Order

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read this `SKILL.md`.
4. Review `docs/materials.md`, `docs/generation-format.md`, and `docs/publishing.md`.
5. Check `TODO.md` and add same-granularity items for newly discovered work before implementing them.

## Source Intake Workflow

1. User places local documents under `materials/`.
2. User stores target Web page URLs as Markdown or text files under `materials/`, and sends the same URLs in chat.
3. The chat instruction is the execution trigger.
4. Codex reads local documents and browses URLs when needed.
5. Codex records sources in `studies/<study-id>/study.config.json`.
6. Codex updates:
   - `studies/<study-id>/data/units.json`
   - `studies/<study-id>/data/questions.json`
   - `studies/<study-id>/study.config.json` when sources or exam variants change
7. Codex moves processed input files from `materials/` to `studies/<study-id>/sources/`.
8. Codex leaves `materials/` empty.
9. Codex runs `npm run generate`.
10. Codex validates the generated static site and pushes to `main` when release is requested.

## Implementation Guidance

- Do not rebuild this as a frontend authoring app.
- Keep generator logic in `scripts/`.
- Keep static templates in `templates/`.
- Keep `materials/` as an untracked temporary inbox only.
- Keep processed source materials in `studies/<study-id>/sources/`.
- Keep publishable generated output in `dist/`; it is ignored by Git.
- Validate study data before rendering.
- Generated mock-test pages may use small vanilla JavaScript for learner-side settings, timing, answering, and scoring.
- Use `examVariants` in `study.config.json` when one study needs multiple mock-test pages such as 科目A and 科目B.
- Questions for variant studies must declare `examId` or `examIds`; generated variant pages live under `dist/studies/<slug>/mock-test/<exam-id>/`.
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
- Variant mock-test pages open when `examVariants` is configured.
- Questions are hidden until Start is pressed.
- Display mode, total time, font, and font size controls work.
- Category appears as read-only question metadata.
- Figure/image questions render.
- Answer choice order and displayed symbols randomize per attempt.
- Answer selection shows feedback.
- Remaining time, average answer time, and remaining-question pace are visible.
- Desktop and mobile widths do not overlap or clip primary text.

## GitHub Pages

- Push to `main` triggers `.github/workflows/pages.yml`.
- The workflow deploys `dist/` to GitHub Pages.
- After push, confirm the workflow completes and the published URL returns HTTP 200 when feasible.
