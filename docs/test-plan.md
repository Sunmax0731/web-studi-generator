# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | Generator, templates, and tests style check | Passed |
| Unit tests | `npm test` | Schema validation and exam metric helpers | Passed: 3 tests |
| Static build | `npm run build` | Generate GitHub Pages files into `dist/` | Passed: 3 studies generated |
| E2E smoke | `npm run e2e` | Browser verification of generated static site and FE mock-test interaction | Passed: 1 Chromium test |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Pending for the current task |

## Runtime Gate

Platform runtime gate for generated Web pages:

- In-app Browser note: `iab` was attempted and unavailable in this environment.
- Headless browser: Playwright Chromium.
- Non-blank top page: passed.
- Top page shows `資格試験学習ページ` and links the registered studies: passed.
- Basic information study page shows 5 units and recorded local/web sources: passed.
- Mock-test page opens: passed.
- Questions are hidden until Start is pressed: passed.
- Display mode, total time, and font size controls work: passed.
- Category selector is absent during answering: passed.
- Category is shown as read-only question metadata: passed.
- 18 FE questions render after Start: passed.
- Figure question renders: passed.
- Answer selection shows correctness feedback: passed.
- Remaining time, average answer time, and remaining-question pace are visible: passed.
- Desktop and mobile widths render without primary text overlap in screenshots: passed at 1440x1000 and 390x900.

Runtime screenshots are stored under ignored `output/fe-runtime/`.

## Manual Scenario For Future Source Intake

1. Place local files and URL notes under `materials/`.
2. Send the same Web page URLs in chat and instruct Codex to run generation.
3. Codex reads sources and updates `studies/<study-id>/`.
4. Move processed materials to `studies/<study-id>/sources/` and leave `materials/` empty.
5. Run `npm run build`.
6. Review generated pages.
7. Push the task branch, and push or merge to `main` when release is requested.

## Known Boundaries

- Source reading is performed by Codex during the session, not by a committed crawler.
- PDF/web extraction adapters are not automated CLI commands yet.
- Inline generated figures are supported for registered figure kinds. Study-specific uploaded image asset copying is still a follow-up.
