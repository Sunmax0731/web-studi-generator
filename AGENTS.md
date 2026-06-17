# AGENTS

This repository is part of the WebApp domain under `D:\AI\WebApp`.

## Scope

- Repository: `D:\AI\WebApp\web-studi-generator`
- Purpose: Foundation for generating study pages and mock tests for arbitrary domains and certifications.
- Runtime: Browser-based React/Vite app.

## Working Rules

- Read `README.md`, then `AGENTS.md`, then `SKILL.md` before changing this repository.
- Use `docs/` as the next source of truth after the top-level files.
- Keep changes scoped to this repository.
- Update `TODO.md` before implementing newly discovered work.
- Keep implementation, docs, test evidence, QCDS, and release checklist aligned in the same task.
- Store temporary runtime screenshots, traces, and debug captures under `output/`; do not commit them.
- If project structure, workflow, or canonical paths change, update this file and `SKILL.md`.

## Quality Gates

- `npm run lint`
- `npm test`
- `npm run build`
- Browser or headless runtime gate: non-blank render, core UI visible, primary mock-test interaction works.
- `npm run docs:zip`

## Git

- Use one task branch named `codex/<task-summary>`.
- Commit and push normally when credentials and permissions allow it.
- Public GitHub remote is expected for a new repository unless blocked by authentication or network errors.
