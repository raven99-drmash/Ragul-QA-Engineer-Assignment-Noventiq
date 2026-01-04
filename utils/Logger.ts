import { Page } from '@playwright/test';

export async function log(
    screenshotRequired: boolean,
    message: string,
    page: Page
) {
    if (screenshotRequired) {
        await page.screenshot({
            path: `screenshots/${message}_${Date.now()}.png`,
            fullPage: true
        });
    }
    console.log(message);
}
