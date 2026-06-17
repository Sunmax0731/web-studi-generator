export function calculateExamStats({ answeredCount, elapsedSeconds, totalQuestions, totalMinutes }) {
  const totalSeconds = Math.max(Number(totalMinutes) || 0, 0) * 60
  const elapsed = Math.max(Number(elapsedSeconds) || 0, 0)
  const answered = Math.max(Number(answeredCount) || 0, 0)
  const total = Math.max(Number(totalQuestions) || 0, 0)
  const unansweredCount = Math.max(total - answered, 0)
  const remainingSeconds = Math.max(totalSeconds - elapsed, 0)

  return {
    averageAnswerSeconds: answered === 0 ? 0 : elapsed / answered,
    remainingSeconds,
    unansweredCount,
    secondsPerRemainingQuestion: unansweredCount === 0 ? 0 : remainingSeconds / unansweredCount,
    completionRate: total === 0 ? 0 : answered / total,
  }
}

export function formatDuration(seconds) {
  const safeSeconds = Math.max(Math.round(Number(seconds) || 0), 0)
  const minutes = Math.floor(safeSeconds / 60)
  const restSeconds = safeSeconds % 60
  return `${minutes}:${restSeconds.toString().padStart(2, '0')}`
}

export function isAnswerCorrect(question, selectedChoiceIds) {
  const expected = [...question.correctChoiceIds].sort()
  const actual = [...selectedChoiceIds].sort()
  return expected.length === actual.length && expected.every((id, index) => id === actual[index])
}
