import { test, expect } from '@playwright/test';

test('Критичний шлях M-Bionica: вибір окулярів', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Використовуємо роль та унікальну назву (alt), яку нам підказав Playwright
    const glasses = page.getByRole('img', { name: 'Bionic Glass v1.0' });

    await expect(glasses).toBeVisible(); // Тепер це спрацює, бо елемент один
    await glasses.click();
});