# Studi Generator

`web-studi-generator` is a Codex-driven static study-site generator for GitHub Pages.

It is not a frontend authoring app. The repository is the generation foundation:

1. Put local documents under `materials/`.
2. Send Web page URLs in chat during a Codex session.
3. Codex reads the materials and URLs.
4. Codex updates `studies/<study-id>/study.config.json` and `studies/<study-id>/data/*.json`.
5. `npm run generate` creates static HTML/CSS/JS in `dist/`.
6. GitHub Actions deploys `dist/` to GitHub Pages from `main`.

## Current Sample Studies

- 基本情報技術者試験
- 色彩検定
- 狩猟免許（わな）

## Repository Layout

```text
materials/              Local source documents for Codex to read
studies/                Study definitions and generated JSON data
templates/              Static HTML/CSS/JS templates
scripts/                Generator and validation helpers
dist/                   Generated GitHub Pages site, ignored by Git
.github/workflows/      GitHub Pages deployment workflow
```

## Generated Page Features

The generated mock-test pages include:

- 1ページに複数問 / 1ページに1問 display setting
- category filtering
- total exam time setting
- elapsed time
- remaining time
- average answer time
- remaining question count
- available time per remaining question
- font family setting
- font size setting
- selectable answers and correctness feedback

Supported question patterns:

- 択一式
- 空欄補充形式
- 複数選択式
- 組み合わせ問題
- 個数問題
- 正誤方式

## Local Workflow

```powershell
npm install
npm run generate
npm run preview
```

Open `http://127.0.0.1:4173`.

## Validation

```powershell
npm run lint
npm test
npm run build
npm run e2e
npm run docs:zip
```

`npm run build` is intentionally an alias for `npm run generate`; the deployable artifact is the generated static `dist/` directory.

## Publishing

Push to `main` to run `.github/workflows/pages.yml`. The workflow installs dependencies, validates the generator, builds `dist/`, and deploys the static site to GitHub Pages.

## Documentation

- [docs/materials.md](docs/materials.md)
- [docs/generation-format.md](docs/generation-format.md)
- [docs/publishing.md](docs/publishing.md)
- [docs/test-plan.md](docs/test-plan.md)
- [docs/qcds-evaluation.md](docs/qcds-evaluation.md)
- [docs/qcds-strict-metrics.json](docs/qcds-strict-metrics.json)
- [docs/release-checklist.md](docs/release-checklist.md)
