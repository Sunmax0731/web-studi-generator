import type { ExamProgress, ExamStats, StudyQuestion } from '../types'

export function calculateExamStats(progress: ExamProgress): ExamStats {
  const totalSeconds = Math.max(progress.totalMinutes, 0) * 60
  const elapsedSeconds = Math.max(progress.elapsedSeconds, 0)
  const answeredCount = Math.max(progress.answeredCount, 0)
  const totalQuestions = Math.max(progress.totalQuestions, 0)
  const unansweredCount = Math.max(totalQuestions - answeredCount, 0)
  const remainingSeconds = Math.max(totalSeconds - elapsedSeconds, 0)

  return {
    averageAnswerSeconds: answeredCount === 0 ? 0 : elapsedSeconds / answeredCount,
    remainingSeconds,
    unansweredCount,
    secondsPerRemainingQuestion:
      unansweredCount === 0 ? 0 : remainingSeconds / unansweredCount,
    completionRate: totalQuestions === 0 ? 0 : answeredCount / totalQuestions,
  }
}

export function formatDuration(seconds: number): string {
  const safeSeconds = Math.max(Math.round(seconds), 0)
  const minutes = Math.floor(safeSeconds / 60)
  const restSeconds = safeSeconds % 60
  return `${minutes}:${restSeconds.toString().padStart(2, '0')}`
}

export function filterQuestionsByCategory(
  questions: StudyQuestion[],
  category: string,
): StudyQuestion[] {
  if (category === 'すべて') {
    return questions
  }

  return questions.filter((question) => question.category === category)
}

export function isAnswerCorrect(question: StudyQuestion, selectedChoiceIds: string[]): boolean {
  const expected = [...question.correctChoiceIds].sort()
  const actual = [...selectedChoiceIds].sort()

  return expected.length === actual.length && expected.every((id, index) => id === actual[index])
}
