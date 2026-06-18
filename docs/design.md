# Design

## Product Shape

Studi Generator is not an authoring web app. It is a static site generator operated by Codex.

The generated output is a GitHub Pages study site with:

- top page listing generated studies
- study pages with units and sources
- mock-test pages with learner-side settings and scoring

## Generated Page Requirements

Mock-test pages must include:

- one-question and multi-question display mode
- category metadata generated in advance and shown read-only while answering
- total exam time setting
- elapsed time
- remaining time
- average answer time
- remaining question count
- available time per remaining question
- registered question count
- font family control
- font size control
- answer selection and feedback
- scored review filter for showing incorrect answers only
- start-before-display behavior: questions are hidden until Start is pressed
- generated question figures/images
- randomized question order on each attempt, grouped by category
- setup controls hidden during active attempts

## Visual Direction

- static documentation and study-site feel
- quiet, readable Japanese typography
- restrained blue, teal, and amber accents
- 8px or smaller panel/control radii
- no marketing hero, decorative orbs, or app-builder chrome

## Responsive Requirements

- top page cards collapse to one column
- study page source panel moves below units on narrow screens
- mock-test settings/status panel stays above the answer panel on desktop and mobile
- primary Japanese text must not overlap or clip at mobile width
