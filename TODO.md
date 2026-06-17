# TODO

## MVP Foundation

- [x] Create React/Vite TypeScript project at `D:\AI\WebApp\web-studi-generator`.
- [x] Add repository-specific `README.md`, `AGENTS.md`, and `SKILL.md`.
- [x] Model arbitrary study themes, categories, source materials, study units, and selectable mock-test questions.
- [x] Seed sample themes for 基本情報技術者試験, 色彩検定, and 狩猟免許（わな）.
- [x] Support mock-test patterns: 択一式, 空欄補充形式, 複数選択式, 組み合わせ問題, 個数問題, 正誤方式.
- [x] Implement one-question and multi-question display modes.
- [x] Implement elapsed time, remaining time, average answer time, remaining question count, and available time per remaining question.
- [x] Implement font family and font size controls.
- [x] Implement category filtering for category-based exams.

## Validation And Release

- [x] Add unit tests for exam metrics and answer handling helpers.
- [x] Add Playwright smoke test for the primary workflow.
- [x] Pass `npm run lint`.
- [x] Pass `npm test`.
- [x] Pass `npm run build`.
- [x] Pass browser runtime gate.
- [x] Create docs ZIP with `npm run docs:zip`.
- [x] Create public GitHub remote, commit, and push.

## Follow-Up Backlog

- [ ] Add source-ingestion adapters for web pages, PDFs, and local notes.
- [ ] Add persistent project save/load.
- [ ] Add authoring review UI for Codex-generated explanations and diagrams.
- [ ] Add export target for generated static study pages.
