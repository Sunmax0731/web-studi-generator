export const questionPatterns = [
  'single-choice',
  'cloze',
  'multiple-select',
  'matching',
  'counting',
  'true-false',
]

export const questionPatternLabels = {
  'single-choice': '択一式',
  cloze: '空欄補充形式',
  'multiple-select': '複数選択式',
  matching: '組み合わせ問題',
  counting: '個数問題',
  'true-false': '正誤方式',
}

export function validateStudy(study, context = 'study') {
  const errors = []

  if (!study.id) errors.push(`${context}: id is required`)
  if (!study.title) errors.push(`${context}: title is required`)
  if (!study.slug) errors.push(`${context}: slug is required`)
  if (!Array.isArray(study.categories) || study.categories.length === 0) {
    errors.push(`${context}: categories must not be empty`)
  }
  if (!Array.isArray(study.units) || study.units.length === 0) {
    errors.push(`${context}: units must not be empty`)
  }
  if (!Array.isArray(study.questions) || study.questions.length === 0) {
    errors.push(`${context}: questions must not be empty`)
  }

  for (const [index, question] of (study.questions ?? []).entries()) {
    const label = `${context}: questions[${index}]`
    if (!question.id) errors.push(`${label}: id is required`)
    if (!study.categories.includes(question.category)) {
      errors.push(`${label}: category "${question.category}" is not defined`)
    }
    if (!questionPatterns.includes(question.pattern)) {
      errors.push(`${label}: unsupported pattern "${question.pattern}"`)
    }
    if (!Array.isArray(question.choices) || question.choices.length < 2) {
      errors.push(`${label}: at least two choices are required`)
    }
    if (!Array.isArray(question.correctChoiceIds) || question.correctChoiceIds.length === 0) {
      errors.push(`${label}: correctChoiceIds must not be empty`)
    }
    const choiceIds = new Set((question.choices ?? []).map((choice) => choice.id))
    for (const correctChoiceId of question.correctChoiceIds ?? []) {
      if (!choiceIds.has(correctChoiceId)) {
        errors.push(`${label}: correct choice "${correctChoiceId}" does not exist`)
      }
    }
    if (question.pattern !== 'multiple-select' && (question.correctChoiceIds ?? []).length !== 1) {
      errors.push(`${label}: ${question.pattern} must have exactly one correct choice`)
    }
  }

  return errors
}
