import { test, expect, Page, Locator, chromium, Browser, BrowserContext } from '@playwright/test';
import fs from 'fs';
import * as Logger from '../utils/Logger';
import jsonData from '../test-data/cricbuzz.json';
import AxeBuilder from '@axe-core/playwright';

const baseSite = 'https://www.cricbuzz.com/';

test.beforeEach('bE', async ({ page }) => {
    await page.goto(baseSite);
    await page.screenshot({ path: 'homepage.png' });
});

test.skip('Testcase 001 @International', async ({ page }) => {
    await page.evaluate(() => {
        const lnk = 'a[href="/cricket-series/10884/international-league-t20-2025-26/points-table"]';
        (document.querySelector(lnk) as HTMLElement).click();
    });
});
test.skip('Testcase 002 @IPL', async ({ page }) => {
    await page.getByTitle('IPL Auction 2026').click();
});

const lnks = ['Live Cricket Score', 'Cricket Schedule', 'Cricket Scorecard Archives', 'News'];
lnks.forEach(lnk => {
    test.skip(`testcase03 ${lnk}`, async ({ page }) => {
        const loc = page.getByTitle(lnk).nth(0);
        await loc.hover();
        await page.waitForTimeout(5500);
        await loc.click();
        console.log(await page.title());
    })
});

const matches = "//div[@class='shadow rounded-md overflow-hidden']";
const arr: [number, string][] = [[1, 'Schedule'],
[2, 'Points Table'],
[3, 'Points Table'],
[4, 'Points Table'],
[5, 'Schedule'],
[6, 'Schedule']];

for (const [matchNo, linkName] of arr) {
    test.skip(`testcase004 ${matchNo}`, async ({ page }) => {
        await Logger.log(true, `User has landed`, page);
        const match: Locator = page.locator(matches).nth(matchNo - 1);
        await match.getByTitle(linkName).click();
        await Logger.log(true, `User has clicked ${linkName} for ${matchNo}`, page);
    })
};


for (const i of jsonData) {
    test.skip(`testcase05 ${i.matchNo}`, async ({ page }) => {
        const matchNo = i.matchNo;
        const linkName = i.linkName;
        await Logger.log(true, `User has landed`, page);
        const match: Locator = page.locator(matches).nth(matchNo - 1);
        await match.getByTitle(linkName).click();
        await Logger.log(true, `User has clicked ${linkName} for ${matchNo}`, page);
    });
}

test.skip('HeadersVisualTest', async ({ page }) => {
    await expect(page).toHaveScreenshot('homepage.png');
    await expect(page.locator(`//div[contains(@class,'w-full text-white bg-cbGrnCyn') and a]`)).toHaveScreenshot('headers.png');
});

test('accessibility test', async ({ page }, testInfo) => {
    const result = await new AxeBuilder({ page }).analyze();
    console.log(result.violations.length);
    await testInfo.attach('scanResults', {
        body: JSON.stringify(result, null, 3),
        contentType: 'application/json'
    });
})