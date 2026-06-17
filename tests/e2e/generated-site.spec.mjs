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
  await expect(page.locator('[data-setting="category"]')).toHaveCount(0)
  await expect(page.locator('.question-card')).toHaveCount(0)
  await expect(page.getByText('開始を押すと問題が表示されます')).toBeVisible()

  await page.getByLabel('表示方法').selectOption('single')
  await page.locator('input[data-setting="fontSize"]').fill('20')
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('[data-question-surface]')).toHaveCSS('font-size', '20px')
  await expect(page.locator('.question-card')).toHaveCount(1)
  await expect(page.locator('.pager')).toBeVisible()
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
  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.locator('.question-card')).toHaveCount(20)
  await expect(page.locator('.question-card').first().locator('.question-meta')).toContainText('セキュリティ')
})

async function answerFirstQuestionCorrectly(page) {
  const firstCard = page.locator('.question-card').first()
  const choiceCount = await firstCard.locator('.choice-list button').count()
  for (let index = 0; index < choiceCount; index += 1) {
    await firstCard.locator('.choice-list button').nth(index).click()
    if ((await page.locator('.answer-feedback.correct').count()) > 0) return
  }
}
