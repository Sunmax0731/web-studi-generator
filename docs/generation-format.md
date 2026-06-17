# Generation Format

The static site is generated from `studies/`.

## Registry

`studies/registry.json`

```json
{
  "studies": [
    { "id": "basic-info" }
  ]
}
```

Each `id` points to `studies/<study-id>/`.

## Study Config

`studies/<study-id>/study.config.json`

Required fields:

- `id`
- `slug`
- `title`
- `description`
- `accent`
- `categories`
- `examSettings`
- `sources`

`examSettings` controls the default generated mock-test page:

```json
{
  "presentationMode": "multi",
  "totalMinutes": 60,
  "fontFamily": "system",
  "fontSize": 17
}
```

## Units

`studies/<study-id>/data/units.json`

Each unit has:

- `id`
- `category`
- `title`
- `objective`
- `outline`

## Questions

`studies/<study-id>/data/questions.json`

Each question has:

- `id`
- `category`
- `pattern`
- `prompt`
- `visualHint` optional
- `figure` optional
- `choices`
- `correctChoiceIds`
- `explanation`

Supported `pattern` values:

- `single-choice`
- `cloze`
- `multiple-select`
- `matching`
- `counting`
- `true-false`

Optional `figure` values:

```json
{
  "kind": "spectrum",
  "title": "彩度の変化",
  "caption": "低彩度から高彩度へ変化するイメージ"
}
```

Supported `figure.kind` values:

- `binary-search`
- `spectrum`
- `notice`

`category` is generated into the question data and displayed as read-only metadata during answering. Learners do not select categories on the mock-test page.

## Validation

`scripts/lib/schema.mjs` validates:

- required study fields
- categories
- non-empty units and questions
- supported question patterns
- supported figure kinds
- answer choices
- correct answer IDs
- single-answer restrictions for non-multiple-select questions
