# Publishing

The generated site is published to GitHub Pages from `dist/`.

## Local Build

```powershell
npm run build
```

`npm run build` runs `scripts/generate.mjs` and writes:

```text
dist/
  index.html
  assets/
  studies/<slug>/index.html
  studies/<slug>/mock-test/index.html
```

## Local Preview

```powershell
npm run preview
```

Open:

```text
http://127.0.0.1:4173
```

## GitHub Pages

`.github/workflows/pages.yml` runs on pushes to `main`.

Workflow steps:

1. Checkout repository.
2. Install dependencies with `npm ci`.
3. Run `npm run lint`.
4. Run `npm test`.
5. Run `npm run build`.
6. Upload `dist/` as a Pages artifact.
7. Deploy to GitHub Pages.

## Codex Release Workflow

1. Read local materials and user-provided URLs.
2. Update `studies/` data.
3. Run validation commands.
4. Commit changes.
5. Push branch and `main` when release is requested.
6. Watch the GitHub Pages workflow when feasible.
7. Confirm the published URL returns HTTP 200 when feasible.
