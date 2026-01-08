import { test } from '@playwright/test';
import * as XL from 'xlsx';

test.skip('tc01', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/shadowdom');
    console.log(await page.locator(`#my-btn[type='button']`).first().innerText());
})

test('tc02', async ({ page }) => {
    const wbk: XL.WorkBook = XL.readFile('test-data/TestCasesDoc.xlsx');
    const data = XL.utils.sheet_to_json(wbk.Sheets[wbk.SheetNames[0]]); //converts sheet data to json


    console.log(data);
})