import { expect, test } from '@playwright/test'

test('generated static site starts FE subject A and B mock tests with official counts', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('資格試験学習ページ')
  await expect(page.getByRole('heading', { name: '資格試験学習ページ' })).toBeVisible()
  await expect(page.locator('.hero-band p')).toHaveCount(0)
  await expect(page.locator('.study-card')).toHaveCount(3)

  await page.getByRole('link', { name: '基本情報技術者試験' }).click()
  await expect(page.getByRole('heading', { name: '基本情報技術者試験' })).toBeVisible()
  await expect(page.locator('.unit-block')).toHaveCount(5)
  await expect(page.locator('.exam-choice')).toHaveCount(2)
  await expect(page.getByRole('heading', { name: '科目A 模擬試験' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '科目B 模擬試験' })).toBeVisible()

  await page.locator('.exam-choice').filter({ hasText: '科目A 模擬試験' }).getByRole('link', { name: '開始' }).click()
  await expect(page).toHaveTitle('基本情報技術者試験 科目A 模擬試験')
  await expect(page.getByRole('heading', { name: '表示と時間の設定' })).toBeVisible()
  await expect(page.getByLabel('全体の解答時間（分）')).toHaveValue('90')
  await expect(page.getByLabel('回答モード')).toHaveValue('exam')
  await expect(page.locator('[data-setting="questionCount"]')).toHaveValue('60')
  await expect(page.locator('[data-setting="questionCount"]')).toHaveAttribute('max', '90')
  await expect(page.locator('[data-setting="category"]')).toHaveCount(0)
  await expect(page.locator('.question-card')).toHaveCount(0)
  await expect(page.getByText('開始を押すと問題が表示されます')).toBeVisible()
  await expect(page.getByText('問題と選択肢の記号は開始ごとにランダムな順番になります。')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '一時停止' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'リセット' })).toBeDisabled()
  await expect(page.getByRole('button', { name: '採点する' })).toBeDisabled()

  await page.getByLabel('回答モード').selectOption('study')
  await page.getByLabel('表示方法').selectOption('single')
  await page.locator('input[data-setting="fontSize"]').fill('20')
  await page.evaluate(() => {
    Math.random = () => 0.999
  })
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('[data-question-surface]')).toHaveCSS('font-size', '20px')
  await expect(page.locator('.question-card')).toHaveCount(1)
  await expect(page.locator('.pager')).toBeVisible()
  await expect(page.getByRole('button', { name: '前の問題' })).toBeDisabled()
  await expect(page.getByRole('button', { name: '次の問題' })).toBeEnabled()
  await page.getByRole('button', { name: '次の問題' }).click()
  await expect(page.locator('[data-page-status]')).toHaveText('2 / 60')
  await expect(page.getByRole('button', { name: '前の問題' })).toBeEnabled()
  await page.getByLabel('表示方法').selectOption('multi')
  await expect(page.locator('.question-card')).toHaveCount(60)
  await expect(page.locator('.question-meta').first()).toContainText('分類:')
  await expect(page.locator('.question-figure').first()).toBeVisible()

  await answerFirstQuestionCorrectly(page)
  await expect(page.locator('.answer-feedback.correct')).toBeVisible()
  await expect(page.getByText('残問 / 1問あたり')).toBeVisible()

  await page.goto('/studies/basic-info/mock-test/kamoku-b/')
  await expect(page).toHaveTitle('基本情報技術者試験 科目B 模擬試験')
  await expect(page.getByLabel('全体の解答時間（分）')).toHaveValue('100')
  await expect(page.locator('[data-setting="questionCount"]')).toHaveValue('20')
  await expect(page.locator('[data-setting="questionCount"]')).toHaveAttribute('max', '35')
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('.question-card')).toHaveCount(20)
  await expect(page.locator('.question-card').first().locator('.question-meta')).toContainText('セキュリティ')
})

test('mock-test exam mode defers feedback until all questions are scored', async ({ page }) => {
  await page.goto('/studies/basic-info/mock-test/kamoku-a/')

  await expect(page.getByLabel('回答モード')).toHaveValue('exam')
  await page.locator('[data-setting="questionCount"]').fill('3')
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('.question-card')).toHaveCount(3)
  await expect(page.locator('.answer-feedback')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '採点する' })).toBeDisabled()

  const cards = page.locator('.question-card')
  const cardCount = await cards.count()
  for (let index = 0; index < cardCount; index += 1) {
    await cards.nth(index).locator('.choice-list button').first().click()
  }

  await expect(page.locator('.answer-feedback')).toHaveCount(0)
  await expect(page.locator('[data-result-summary]')).toContainText('全問回答済み')
  await expect(page.getByRole('button', { name: '採点する' })).toBeEnabled()
  await page.getByRole('button', { name: '採点する' }).click()
  await expect(page.locator('[data-result-summary]')).toContainText('採点結果')
  await expect(page.locator('[data-result-summary]')).toContainText('合格')
  await expect(page.locator('.answer-feedback')).toHaveCount(3)
  await expect(page.locator('.choice-list button').first()).toBeDisabled()
})

test('mock-test question count can be set per attempt', async ({ page }) => {
  await page.goto('/studies/basic-info/mock-test/kamoku-a/')

  await expect(page.locator('[data-setting="questionCount"]')).toHaveAttribute('max', '90')
  await page.locator('[data-setting="questionCount"]').fill('10')
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('.question-card')).toHaveCount(10)
  await expect(page.locator('[data-metric="pace"]')).toContainText('10問 /')

  await page.getByRole('button', { name: 'リセット' }).click()
  await page.getByLabel('表示方法').selectOption('single')
  await page.locator('[data-setting="questionCount"]').fill('3')
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('.question-card')).toHaveCount(1)
  await expect(page.locator('[data-page-status]')).toHaveText('1 / 3')
})

test('mock-test answer symbols are reassigned when choices are randomized between attempts', async ({ page }) => {
  await page.goto('/studies/basic-info/mock-test/kamoku-a/')

  await page.evaluate(() => {
    Math.random = () => 0.999
  })
  await page.locator('[data-setting="questionCount"]').fill('90')
  await page.getByRole('button', { name: '開始' }).click()
  const firstOrder = await visibleChoiceLabelsForPrompt(page, '10進数の37')

  await page.getByRole('button', { name: 'リセット' }).click()
  await page.evaluate(() => {
    Math.random = () => 0
  })
  await page.locator('[data-setting="questionCount"]').fill('90')
  await page.getByRole('button', { name: '開始' }).click()
  const secondOrder = await visibleChoiceLabelsForPrompt(page, '10進数の37')

  expect(secondOrder).not.toEqual(firstOrder)
})

test('color test grade variants open with syllabus timings and question counts', async ({ page }) => {
  await page.goto('/studies/color-test/')

  await expect(page.getByRole('heading', { name: '色彩検定' })).toBeVisible()
  await expect(page.locator('.exam-choice')).toHaveCount(4)
  await expect(page.locator('.unit-group')).toHaveCount(4)
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '3級 模擬試験' })).toBeVisible()
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '2級 模擬試験' })).toBeVisible()
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '1級1次 模擬試験' })).toBeVisible()
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '1級2次 模擬試験' })).toBeVisible()
  await expect(page.locator('.unit-group').filter({ hasText: '3級 模擬試験' }).locator('.unit-block')).toHaveCount(5)
  await expect(page.locator('.unit-group').filter({ hasText: '2級 模擬試験' }).locator('.unit-block')).toHaveCount(6)
  await expect(page.locator('.unit-group').filter({ hasText: '1級1次 模擬試験' }).locator('.unit-block')).toHaveCount(7)
  await expect(page.locator('.unit-group').filter({ hasText: '1級2次 模擬試験' }).locator('.unit-block')).toHaveCount(4)

  const variants = [
    ['grade-3', '3級 模擬試験', '60', 97, false],
    ['grade-2', '2級 模擬試験', '70', 104, false],
    ['grade-1-first', '1級1次 模擬試験', '80', 109, false],
    ['grade-1-second', '1級2次 模擬試験', '90', 31, true],
  ]

  for (const [id, title, minutes, questions, singleMode] of variants) {
    await page.goto(`/studies/color-test/mock-test/${id}/`)
    await expect(page).toHaveTitle(`色彩検定 ${title}`)
    await expect(page.getByLabel('全体の解答時間（分）')).toHaveValue(minutes)
    await expect(page.locator('.question-card')).toHaveCount(0)
    await expect(page.getByText('開始を押すと問題が表示されます')).toBeVisible()
    await page.getByRole('button', { name: '開始' }).click()
    await expect(page.locator('.question-card')).toHaveCount(singleMode ? 1 : questions)
    if (singleMode) {
      await expect(page.locator('.pager')).toBeVisible()
      await expect(page.locator('[data-page-status]')).toHaveText(`1 / ${questions}`)
    }
    await expect(page.locator('.question-meta').first()).toContainText('分類:')
  }
})

test('hunting license variants open with license-specific tool categories', async ({ page }) => {
  await page.goto('/studies/trap-hunting/')

  await expect(page.getByRole('heading', { name: '狩猟免許' })).toBeVisible()
  await expect(page.locator('.exam-choice')).toHaveCount(4)
  await expect(page.locator('.unit-group')).toHaveCount(4)
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '網猟免許 模擬試験' })).toBeVisible()
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: 'わな猟免許 模擬試験' })).toBeVisible()
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '第一種銃猟免許 模擬試験' })).toBeVisible()
  await expect(page.getByLabel('模擬試験を選択').getByRole('heading', { name: '第二種銃猟免許 模擬試験' })).toBeVisible()

  const variants = [
    ['ami-hunting', '網猟免許 模擬試験', 'むそう網、はり網、つき網、なげ網'],
    ['wana-hunting', 'わな猟免許 模擬試験', 'くくりわな、はこわな、はこおとし、囲いわな'],
    ['type1-gun', '第一種銃猟免許 模擬試験', '装薬銃（ライフル銃・散弾銃）と空気銃'],
    ['type2-gun', '第二種銃猟免許 模擬試験', '空気銃（圧縮ガス銃を含む。）'],
  ]

  for (const [id, title, toolText] of variants) {
    await page.goto(`/studies/trap-hunting/mock-test/${id}/`)
    await expect(page).toHaveTitle(`狩猟免許 ${title}`)
    await expect(page.getByLabel('全体の解答時間（分）')).toHaveValue('90')
    await expect(page.locator('[data-setting="questionCount"]')).toHaveValue('30')
    await expect(page.locator('[data-setting="questionCount"]')).toHaveAttribute('max', '54')
    await expect(page.locator('.question-card')).toHaveCount(0)
    await expect(page.getByText('開始を押すと問題が表示されます')).toBeVisible()
    await page.getByRole('button', { name: '開始' }).click()
    await expect(page.locator('.question-card')).toHaveCount(30)
    await expect(page.locator('.question-meta').first()).toContainText('分類:')

    await page.getByRole('button', { name: 'リセット' }).click()
    await page.locator('[data-setting="questionCount"]').fill('54')
    await page.getByRole('button', { name: '開始' }).click()
    await expect(page.locator('.question-card')).toHaveCount(54)
    await expect(page.locator('.question-card').filter({ hasText: toolText }).first()).toBeVisible()
  }
})

async function answerFirstQuestionCorrectly(page) {
  const firstCard = page.locator('.question-card').first()
  const choiceCount = await firstCard.locator('.choice-list button').count()
  for (let index = 0; index < choiceCount; index += 1) {
    await firstCard.locator('.choice-list button').nth(index).click()
    if ((await page.locator('.answer-feedback.correct').count()) > 0) return
  }
}

async function visibleChoiceLabelsForPrompt(page, promptText) {
  const card = page.locator('.question-card').filter({ hasText: promptText }).first()
  await expect(card).toBeVisible()
  await expect(card.locator('.choice-list button b')).toHaveText(['A', 'B', 'C', 'D'])
  return card.locator('.choice-list button span').evaluateAll((nodes) =>
    nodes.map((node) => node.textContent.trim()),
  )
}
