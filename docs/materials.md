# Materials

`materials/` is the local source-document intake directory.

## Directory Rule

```text
materials/<study-id>/
```

Examples:

```text
materials/basic-info/
materials/color-test/
materials/trap-hunting/
```

## Accepted Local Inputs

- Markdown
- plain text
- PDF
- images used as figures or source references
- exported notes

## Web Page URL Intake

Web page URLs are not required to be pre-written into the repository. The expected workflow is:

1. User sends URL(s) in chat.
2. Codex browses and extracts relevant learning content.
3. Codex records the source in `studies/<study-id>/study.config.json`.
4. Codex updates generated data in `studies/<study-id>/data/`.
5. Codex runs validation and publishes through GitHub Pages when requested.

## Source Recording

Sources are recorded in `study.config.json`:

```json
{
  "kind": "web",
  "label": "Example source title",
  "url": "https://example.com/source"
}
```

Local files use:

```json
{
  "kind": "local",
  "label": "Local source note",
  "path": "materials/example/source.md"
}
```
