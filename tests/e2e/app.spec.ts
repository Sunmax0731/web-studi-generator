import { expect, test } from '@playwright/test'

test('loads study generator and exercises mock test settings', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Studi Generator' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '基本情報技術者試験' })).toBeVisible()
  const generatorPanel = page.getByLabel('学習ページ生成設定')
  await expect(generatorPanel.getByText('択一式')).toBeVisible()
  await expect(generatorPanel.getByText('空欄補充形式')).toBeVisible()
  await expect(generatorPanel.getByText('複数選択式')).toBeVisible()

  await page.getByRole('button', { name: /色彩検定/ }).click()
  await expect(page.getByRole('heading', { name: '色彩検定' })).toBeVisible()
  await page.getByRole('button', { name: '1問', exact: true }).click()
  await page.getByLabel('カテゴリ').selectOption('配色')
  await expect(page.getByText('トーンをそろえた配色の効果として適切なものをすべて選べ。')).toBeVisible()

  await page.getByRole('button', { name: /A 統一感が出やすい/ }).click()
  await page.getByRole('button', { name: /B 印象を制御しやすい/ }).click()
  await page.getByRole('button', { name: /D 明度と彩度の方向性をそろえられる/ }).click()
  await expect(page.getByText(/正答です/)).toBeVisible()

  await page.getByLabel(/フォントサイズ/).fill('20')
  await expect(page.locator('.exam-preview')).toHaveCSS('font-size', '20px')
})
