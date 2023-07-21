// @ts-check
import { test, expect } from '@playwright/test'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // esperamos 2 segundos a que se hagan las request
  await page.waitForTimeout(2000)

  const paragraph = await page.getByTestId('fact-text')
  const loading = await page.getByTestId('loading')
  const image = await page.getByRole('img')

  const textContent = await paragraph.textContent()
  const src = await image.getAttribute('src')
  const isLoading = await loading.isVisible()

  await expect(isLoading).toBe(false)
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(src?.length).toBeGreaterThan(0)
})
