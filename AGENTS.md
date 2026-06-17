# AGENTS

This repository is part of the WebApp domain under `D:\AI\WebApp`.

## Scope

- Repository: `D:\AI\WebApp\web-studi-generator`
- Purpose: Codex-driven static study-site generator for arbitrary domains and certifications.
- Runtime: Node-based generator that outputs static GitHub Pages files.

## Working Rules

- Read `README.md`, then `AGENTS.md`, then `SKILL.md` before changing this repository.
- Use `docs/` as the next source of truth after the top-level files.
- Keep changes scoped to this repository.
- Update `TODO.md` before implementing newly discovered work.
- Keep implementation, docs, test evidence, QCDS, and release checklist aligned in the same task.
- Store temporary runtime screenshots, traces, and debug captures under `output/`; do not commit them.
- Treat `materials/` as an untracked per-run inbox for local documents and URL notes.
- After a Codex generation run, move processed materials to `studies/<study-id>/sources/` and leave `materials/` empty.
- Keep generated study definitions under `studies/`.
- Keep generated deploy output under `dist/`; do not commit it.
- If project structure, workflow, or canonical paths change, update this file and `SKILL.md`.

## Quality Gates

- `npm run lint`
- `npm test`
- `npm run build`
- Browser or headless runtime gate: generated static site renders, core pages are visible, primary mock-test settings and answering interaction work.
- `npm run docs:zip`

## Git

- Use one task branch named `codex/<task-summary>`.
- Commit and push normally when credentials and permissions allow it.
- Public GitHub remote is expected for a new repository unless blocked by authentication or network errors.
