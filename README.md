# Studi Generator

`web-studi-generator` is a React/Vite foundation for generating study pages and multiple-choice mock tests for arbitrary fields, domains, and certification exams.

The current MVP focuses on the generator base rather than production content ingestion. It models how Codex-generated study material can be organized into themes, categories, learning units, source references, question patterns, exam display settings, and a live learner preview.

## Included Sample Themes

- 基本情報技術者試験
- 色彩検定
- 狩猟免許（わな）

## Core Features

- Theme switcher for multiple study domains.
- Study page blueprint with source intake, generated unit outlines, categories, and review workflow.
- Mock test schema covering:
  - 択一式
  - 空欄補充形式
  - 複数選択式
  - 組み合わせ問題
  - 個数問題
  - 正誤方式
- Category filtering for exams like 基本情報技術者試験.
- One-question and multi-question presentation modes.
- Total elapsed time, remaining time, average answer time, remaining question count, and available time per remaining question.
- Font family and font size controls for the preview.
- Live answer state with correctness feedback.

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest
- Playwright
- lucide-react

## Local Development

```powershell
npm install
npm run dev
```

Open the Vite URL printed by the command.

## Validation

```powershell
npm run lint
npm test
npm run build
npm run e2e
npm run docs:zip
```

Runtime gate expectation: open the app in Chrome or a headless browser, confirm non-blank rendering, major visible elements, responsive layout, and the primary mock-test interaction path.

## Documentation

- [docs/design.md](docs/design.md)
- [docs/test-plan.md](docs/test-plan.md)
- [docs/qcds-evaluation.md](docs/qcds-evaluation.md)
- [docs/qcds-strict-metrics.json](docs/qcds-strict-metrics.json)
- [docs/release-checklist.md](docs/release-checklist.md)

`npm run docs:zip` creates `release/web-studi-generator-docs.zip`. The ZIP is a local release artifact and is ignored by Git.
