const { test, expect } = require('@playwright/test');
const path = require('path');

test('Перевірка головної сторінки Bionic Safety Hub', async ({ page }) => {
  // 1. Відкриваємо твій локальний файл index.html
  // path.resolve допомагає знайти шлях до файлу незалежно від того, де лежить папка
  await page.goto(`file://${path.resolve(__dirname, '../bionic-project/index.html')}`);

  // 2. Перевіряємо, чи заголовок вкладки в браузері правильний
  await expect(page).toHaveTitle(/Bionic Safety Hub/);

  // 3. Перевіряємо, чи видимий головний заголовок на сторінці
  const header = page.locator('h1');
  await expect(header).toBeVisible();
  await expect(header).toHaveText('Система моніторингу окулярів');

  // 4. Перевіряємо наявність кнопки перевірки сигналу
  const button = page.locator('#test-btn');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Перевірити сигнал');
});