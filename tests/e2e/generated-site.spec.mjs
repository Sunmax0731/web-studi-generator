import { expect, test } from '@playwright/test'

test('generated static site exposes studies and interactive mock-test controls', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Studi Generator')
  await expect(page.getByRole('heading', { name: '資料と URL から学習ページと模擬テストを生成する土台' })).toBeVisible()
  await expect(page.getByRole('link', { name: '基本情報技術者試験' })).toBeVisible()
  await expect(page.getByRole('link', { name: '色彩検定' })).toBeVisible()
  await expect(page.getByRole('link', { name: '狩猟免許（わな）' })).toBeVisible()

  await page.getByRole('link', { name: '色彩検定' }).click()
  await expect(page.getByRole('heading', { name: '学習単元' })).toBeVisible()
  await expect(page.getByText('資料と URL')).toBeVisible()

  await page.getByRole('link', { name: '模擬テストを開始' }).click()
  await expect(page.getByRole('heading', { name: '表示と時間の設定' })).toBeVisible()
  await page.getByLabel('表示方法').selectOption('single')
  await page.getByLabel('カテゴリ').selectOption('配色')
  await page.getByLabel('全体の解答時間（分）').fill('30')
  await page.locator('input[data-setting="fontSize"]').fill('20')

  await expect(page.locator('[data-question-surface]')).toHaveCSS('font-size', '20px')
  await expect(page.getByText('トーンをそろえた配色の効果として適切なものをすべて選べ。')).toBeVisible()
  await page.getByRole('button', { name: /A 統一感が出やすい/ }).click()
  await page.getByRole('button', { name: /B 印象を制御しやすい/ }).click()
  await page.getByRole('button', { name: /D 明度と彩度の方向性をそろえられる/ }).click()
  await expect(page.getByText(/正答です/)).toBeVisible()
  await expect(page.getByText('残問 / 1問あたり')).toBeVisible()
})
