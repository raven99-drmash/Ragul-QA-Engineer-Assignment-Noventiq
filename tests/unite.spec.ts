import { test, expect, Page, Locator } from '@playwright/test';
import { RoadmapHome } from '../pages/uniteHome'
import * as Logger from '../utils/Logger';
import { GlobalVariables as GV } from '../utils/GlobalVar';

const baseURL: string = 'https://roadmap.sh/';

test.beforeEach('be', async ({ page }) => {
    await page.goto(baseURL);
    console.log(GV.age);
    await Logger.log(true, `Navigated to home page`, page)
});

test('TC001 @FV', async ({ page, context }) => {
    console.log(await page.title());
})