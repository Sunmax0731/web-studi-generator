import { describe, expect, it } from 'vitest'
import {
  calculateExamStats,
  filterQuestionsByCategory,
  formatDuration,
  isAnswerCorrect,
} from './examMetrics'
import { studyThemes } from '../data/themes'

describe('calculateExamStats', () => {
  it('calculates average answer time and available time per remaining question', () => {
    const stats = calculateExamStats({
      answeredCount: 4,
      elapsedSeconds: 300,
      totalQuestions: 10,
      totalMinutes: 20,
    })

    expect(stats.averageAnswerSeconds).toBe(75)
    expect(stats.remainingSeconds).toBe(900)
    expect(stats.unansweredCount).toBe(6)
    expect(stats.secondsPerRemainingQuestion).toBe(150)
    expect(stats.completionRate).toBe(0.4)
  })

  it('handles no answered questions without dividing by zero', () => {
    const stats = calculateExamStats({
      answeredCount: 0,
      elapsedSeconds: 45,
      totalQuestions: 8,
      totalMinutes: 5,
    })

    expect(stats.averageAnswerSeconds).toBe(0)
    expect(stats.unansweredCount).toBe(8)
    expect(stats.secondsPerRemainingQuestion).toBeCloseTo(31.875)
  })
})

describe('exam helpers', () => {
  it('formats mm:ss durations', () => {
    expect(formatDuration(125)).toBe('2:05')
    expect(formatDuration(-10)).toBe('0:00')
  })

  it('filters category-specific question sets', () => {
    const theme = studyThemes[0]
    const technologyQuestions = filterQuestionsByCategory(theme.questions, 'テクノロジ')

    expect(technologyQuestions).toHaveLength(1)
    expect(filterQuestionsByCategory(theme.questions, 'すべて')).toHaveLength(theme.questions.length)
  })

  it('checks single and multiple choice answers without depending on order', () => {
    const colorQuestion = studyThemes[1].questions.find(
      (question) => question.pattern === 'multiple-select',
    )

    expect(colorQuestion).toBeDefined()
    expect(isAnswerCorrect(colorQuestion!, ['d', 'a', 'b'])).toBe(true)
    expect(isAnswerCorrect(colorQuestion!, ['a', 'b'])).toBe(false)
  })
})
