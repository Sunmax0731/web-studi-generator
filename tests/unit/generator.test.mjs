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
  for (const entry of registry.studies) {
    const studyRoot = path.join(repoRoot, 'studies', entry.id)
    const config = JSON.parse(await readFile(path.join(studyRoot, 'study.config.json'), 'utf8'))
    const units = JSON.parse(await readFile(path.join(studyRoot, 'data', 'units.json'), 'utf8'))
    const questions = JSON.parse(await readFile(path.join(studyRoot, 'data', 'questions.json'), 'utf8'))
    const errors = validateStudy({ ...config, units, questions }, entry.id)
    assert.deepEqual(errors, [])
  }
})
