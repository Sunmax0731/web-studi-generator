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

export const figureKinds = ['binary-search', 'spectrum', 'notice']

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

  const examVariantIds = new Set()
  for (const [index, variant] of (study.examVariants ?? []).entries()) {
    const label = `${context}: examVariants[${index}]`
    if (!variant.id) errors.push(`${label}: id is required`)
    if (!variant.title) errors.push(`${label}: title is required`)
    if (!Number.isInteger(variant.totalMinutes) || variant.totalMinutes <= 0) {
      errors.push(`${label}: totalMinutes must be a positive integer`)
    }
    if (!Number.isInteger(variant.questionCount) || variant.questionCount <= 0) {
      errors.push(`${label}: questionCount must be a positive integer`)
    }
    if (variant.id) {
      if (examVariantIds.has(variant.id)) errors.push(`${label}: duplicate id "${variant.id}"`)
      examVariantIds.add(variant.id)
    }
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
    if (question.figure) {
      if (!figureKinds.includes(question.figure.kind)) {
        errors.push(`${label}: unsupported figure kind "${question.figure.kind}"`)
      }
      if (!question.figure.caption) {
        errors.push(`${label}: figure.caption is required when figure is set`)
      }
    }
    if (examVariantIds.size > 0) {
      const questionExamIds = getQuestionExamIds(question)
      if (questionExamIds.length === 0) {
        errors.push(`${label}: examId or examIds is required when examVariants are set`)
      }
      for (const examId of questionExamIds) {
        if (!examVariantIds.has(examId)) {
          errors.push(`${label}: examId "${examId}" is not defined`)
        }
      }
    }
  }

  for (const [index, unit] of (study.units ?? []).entries()) {
    const label = `${context}: units[${index}]`
    if (examVariantIds.size > 0) {
      for (const examId of getQuestionExamIds(unit)) {
        if (!examVariantIds.has(examId)) {
          errors.push(`${label}: examId "${examId}" is not defined`)
        }
      }
    }
  }

  for (const variant of study.examVariants ?? []) {
    const actualCount = (study.questions ?? []).filter((question) =>
      getQuestionExamIds(question).includes(variant.id),
    ).length
    if (variant.questionCount && actualCount < variant.questionCount) {
      errors.push(
        `${context}: examVariants "${variant.id}" expects at least ${variant.questionCount} questions but has ${actualCount}`,
      )
    }
  }

  return errors
}

function getQuestionExamIds(question) {
  if (Array.isArray(question.examIds)) return question.examIds
  if (question.examId) return [question.examId]
  return []
}
