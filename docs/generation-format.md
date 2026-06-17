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

## Validation

`scripts/lib/schema.mjs` validates:

- required study fields
- categories
- non-empty units and questions
- supported question patterns
- answer choices
- correct answer IDs
- single-answer restrictions for non-multiple-select questions
