# Design

## Product Goal

Studi Generator is a work-focused web tool for creating study pages and mock tests from Codex-generated learning material. The first screen is the actual generator workspace, not a landing page.

## Primary Users

- Learners or creators preparing certification study pages.
- Codex-assisted authors who need to turn source material into structured units and selectable questions.
- Reviewers who need to verify generated explanations before publishing.

## MVP Screen

The MVP uses a three-region app layout:

- Left rail: study themes and domain context.
- Main workspace: source intake pipeline, question schema, generated study units.
- Right preview: exam settings, timing metrics, and live learner mock-test preview.

The saved concept reference is `docs/assets/ui-concept.png`.

## Interaction Requirements

- Switching themes updates categories, units, and questions.
- Category filtering limits the mock-test question set.
- Presentation mode switches between one question per page and multiple questions per page.
- Answer selection updates local state and feedback.
- Time controls update elapsed time, remaining time, average answer time, and per-remaining-question time.
- Font controls affect the learner preview.

## Visual System

- Quiet Japanese productivity-tool feel.
- Light neutral background with restrained blue, teal, and amber accents.
- 8px maximum card/control radius unless a pill label is semantically useful.
- Dense but readable panels for repeated work.
- No marketing hero, decorative orbs, nested cards, or generic landing-page composition.

## Accessibility And Responsiveness

- Native controls are used for select, input, and range settings.
- Buttons and inputs include visible focus states.
- Layout collapses to one column below tablet width.
- Primary text must not overlap or clip at mobile width.
