import { test, expect, Page, Locator } from '@playwright/test';
import { RoadmapHome } from '../pages/uniteHome'
import * as Logger from '../utils/Logger';
import { GlobalVariables as ra } from '../utils/GlobalVar';

const baseURL: string = 'https://roadmap.sh/';

test.beforeEach('be', async ({ page }) => {
    await page.goto(baseURL);
    console.log(ra.age);
    await Logger.log(true, `Navigated to home page`, page)

    page.on('response')
});

test('TC001 @FV', async ({ page, context }) => {
    console.log(await page.title());
})