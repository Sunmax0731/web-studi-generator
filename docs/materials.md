# Materials

`materials/` is a temporary, untracked inbox for one Codex generation run.

## Trigger

The execution trigger is a chat instruction. Nothing runs automatically when files are placed under `materials/`.

## What To Put In `materials/`

Place local source documents directly under `materials/` for the current run:

```text
materials/
  syllabus.pdf
  notes.md
  source-links.md
```

Target Web page URLs should also be saved as Markdown or text, for example:

```markdown
# Source URLs

- https://example.com/page-1
- https://example.com/page-2
```

Send the same URLs in chat so Codex can browse them during the session.

## After A Run

After Codex reads the input and updates `studies/<study-id>/`, processed materials are moved to:

```text
studies/<study-id>/sources/
```

Then `materials/` is left empty. The directory is ignored by Git, so user-provided raw materials are not accidentally committed.

## Helper Command

Codex may use this helper after processing input:

```powershell
npm run archive:materials -- <study-id>
```

The helper moves all current `materials/` contents to a timestamped folder under `studies/<study-id>/sources/`.

## Source Recording

Sources used in generated pages are recorded in `study.config.json`.

Web source:

```json
{
  "kind": "web",
  "label": "Example source title",
  "url": "https://example.com/source"
}
```

Archived local source:

```json
{
  "kind": "local",
  "label": "Archived source note",
  "path": "studies/example/sources/2026-06-17T10-00-00-000Z/notes.md"
}
```
