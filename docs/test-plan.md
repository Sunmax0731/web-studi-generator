# Test Plan

## Automated Checks

| Check | Command | Purpose | Status |
| --- | --- | --- | --- |
| Lint | `npm run lint` | Generator, templates, and tests style check | Passed |
| Unit tests | `npm test` | Schema validation and exam metric helpers | Passed: 3 tests |
| Static build | `npm run build` | Generate GitHub Pages files into `dist/` | Passed: 3 studies generated |
| E2E smoke | `npm run e2e` | Browser verification of generated static site | Passed: 1 Chromium test |
| Docs ZIP | `npm run docs:zip` | Release documentation bundle | Passed |

## Runtime Gate

Platform runtime gate for generated Web pages:

- Open generated site in Chrome or headless browser. Passed with Playwright Chromium after Browser `iab` was unavailable.
- Confirm non-blank top page. Passed.
- Confirm the three sample studies are linked. Passed.
- Open a study page and confirm units and sources. Passed.
- Open a mock-test page. Passed.
- Change display mode to one-question. Passed.
- Confirm category selector is not shown during answering. Passed.
- Confirm category is shown as read-only question metadata. Passed.
- Change total exam time. Passed.
- Change font size. Passed.
- Confirm questions are hidden until Start is pressed. Passed.
- Confirm at least one figure/image question renders. Passed.
- Answer a multiple-select question. Passed.
- Confirm correctness feedback. Passed.
- Confirm elapsed time, remaining time, average answer time, and remaining-question pace are visible. Passed.
- Check one mobile-width render for overflow. Passed at 390x900.

## Manual Scenario For Future Source Intake

1. Place local files and URL notes under `materials/`.
2. Send the same Web page URLs in chat and instruct Codex to run generation.
3. Codex reads sources and updates `studies/<study-id>/`.
4. Move processed materials to `studies/<study-id>/sources/` and leave `materials/` empty.
5. Run `npm run build`.
6. Review generated pages.
7. Push to `main` for GitHub Pages deployment.

## Known Boundaries

- Source reading is performed by Codex during the session, not by a committed crawler.
- PDF/web extraction adapters are not automated CLI commands yet.
- Inline generated figures are supported for registered figure kinds. Study-specific uploaded image asset copying is still a follow-up.
