import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { calculateExamStats, formatDuration, isAnswerCorrect } from '../../scripts/lib/examMetrics.mjs'
import { validateStudy } from '../../scripts/lib/schema.mjs'

const repoRoot = path.resolve(import.meta.dirname, '..', '..')

test('exam metrics calculate remaining and per-question time', () => {
  const stats = calculateExamStats({
    answeredCount: 4,
    elapsedSeconds: 300,
    totalQuestions: 10,
    totalMinutes: 20,
  })

  assert.equal(stats.averageAnswerSeconds, 75)
  assert.equal(stats.remainingSeconds, 900)
  assert.equal(stats.unansweredCount, 6)
  assert.equal(stats.secondsPerRemainingQuestion, 150)
  assert.equal(formatDuration(125), '2:05')
})

test('answer correctness handles multiple selection without order dependence', () => {
  const question = {
    correctChoiceIds: ['a', 'b', 'd'],
  }

  assert.equal(isAnswerCorrect(question, ['d', 'a', 'b']), true)
  assert.equal(isAnswerCorrect(question, ['a', 'b']), false)
})

test('registered studies satisfy the static generation schema', async () => {
  const registry = JSON.parse(await readFile(path.join(repoRoot, 'studies', 'registry.json'), 'utf8'))
  let figureCount = 0
  for (const entry of registry.studies) {
    const studyRoot = path.join(repoRoot, 'studies', entry.id)
    const config = JSON.parse(await readFile(path.join(studyRoot, 'study.config.json'), 'utf8'))
    const units = JSON.parse(await readFile(path.join(studyRoot, 'data', 'units.json'), 'utf8'))
    const questions = JSON.parse(await readFile(path.join(studyRoot, 'data', 'questions.json'), 'utf8'))
    figureCount += questions.filter((question) => question.figure).length
    const errors = validateStudy({ ...config, units, questions }, entry.id)
    assert.deepEqual(errors, [])
    if (entry.id === 'basic-info') {
      assert.equal(config.examVariants[0].questionCount, 60)
      assert.equal(config.examVariants[0].totalMinutes, 90)
      assert.equal(questions.filter((question) => question.examId === 'kamoku-a').length, 90)
      assert.equal(config.examVariants[1].questionCount, 20)
      assert.equal(config.examVariants[1].totalMinutes, 100)
      assert.equal(questions.filter((question) => question.examId === 'kamoku-b').length, 35)
    }
    if (entry.id === 'color-test') {
      const expectedVariants = [
        ['grade-3', 60, 15, 97],
        ['grade-2', 70, 17, 104],
        ['grade-1-first', 80, 16, 109],
        ['grade-1-second', 90, 5, 31],
      ]
      assert.deepEqual(
        config.examVariants.map((variant) => [variant.id, variant.totalMinutes, variant.questionCount]),
        expectedVariants.map(([id, minutes, questionCount]) => [id, minutes, questionCount]),
      )
      for (const [examId, , , poolCount] of expectedVariants) {
        assert.equal(questions.filter((question) => question.examId === examId).length, poolCount)
      }
    }
    if (entry.id === 'trap-hunting') {
      const expectedVariants = [
        ['ami-hunting', 90, 30, 54],
        ['wana-hunting', 90, 30, 54],
        ['type1-gun', 90, 30, 54],
        ['type2-gun', 90, 30, 54],
      ]
      assert.deepEqual(
        config.examVariants.map((variant) => [variant.id, variant.totalMinutes, variant.questionCount]),
        expectedVariants.map(([id, minutes, questionCount]) => [id, minutes, questionCount]),
      )
      for (const [examId, , , poolCount] of expectedVariants) {
        assert.equal(
          questions.filter((question) => question.examId === examId || question.examIds?.includes(examId)).length,
          poolCount,
        )
      }
    }
  }
  assert.ok(figureCount >= 3)
})
