import { expect, test } from '@playwright/test'

test('generated static site starts mock test on demand and supports figures', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('資格試験学習ページ')
  await expect(page.getByRole('heading', { name: '資格試験学習ページ' })).toBeVisible()
  await expect(page.locator('.hero-band p')).toHaveCount(0)
  await expect(page.locator('.study-card')).toHaveCount(3)

  await page.locator('.study-card a').nth(1).click()
  await expect(page.locator('.unit-block')).toHaveCount(3)
  await expect(page.locator('.unit-category')).toHaveCount(0)

  await page.locator('.button.primary').click()
  await expect(page.getByRole('heading', { name: '表示と時間の設定' })).toBeVisible()
  await expect(page.locator('[data-setting="category"]')).toHaveCount(0)
  await expect(page.locator('.question-card')).toHaveCount(0)
  await expect(page.getByText('開始を押すと問題が表示されます')).toBeVisible()

  await page.getByLabel('表示方法').selectOption('multi')
  await page.getByLabel('全体の解答時間（分）').fill('30')
  await page.locator('input[data-setting="fontSize"]').fill('20')
  await page.getByRole('button', { name: '開始' }).click()

  await expect(page.locator('[data-question-surface]')).toHaveCSS('font-size', '20px')
  await expect(page.locator('.question-card')).toHaveCount(3)
  await expect(page.locator('.question-meta').first()).toContainText('分類:')
  await expect(page.locator('.question-figure').first()).toBeVisible()

  await page.getByRole('button', { name: /A 統一感が出やすい/ }).click()
  await page.getByRole('button', { name: /B 印象を制御しやすい/ }).click()
  await page.getByRole('button', { name: /D 明度と彩度の方向性をそろえられる/ }).click()
  await expect(page.locator('.answer-feedback.correct')).toBeVisible()
  await expect(page.getByText('残問 / 1問あたり')).toBeVisible()
})
