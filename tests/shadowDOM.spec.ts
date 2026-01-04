import { test } from '@playwright/test';


test('tc01', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/shadowdom');
    console.log(await page.locator(`#my-btn[type='button']`).first().innerText());
}) 