import { test, expect } from '@playwright/test';
import testdata from '../test-data/inputdata.json';

/**
 * @author Ragul
 * @description Common function to login inside practice website
 * @param page 
 * @param username 
 * @param password 
 */
async function loginPractice(page: any, username: string, password: string) {
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('#submit');
}

const validUser: string = testdata.valid.username;
const validPass: string = testdata.valid.password;
test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});

test('TC_01 - Check login page fields are present', async ({ page }) => {
    const ele1 = page.locator("#username");
    const ele2 = page.locator("#password");
    const ele3 = page.locator("#submit");

    await expect(ele1).toBeEditable();
    await expect(ele2).toBeEditable();
    await expect(ele3).toBeVisible();
});


test('TC_02 - Check the page title and other header info are shown in UI', async ({ page }) => {
    const ele1 = page.locator("a.custom-logo-link");
    const ele2 = page.locator("#menu-primary-items");
    const ele3 = page.locator("#login");
    expect(await page.title()).toBe("Test Login | Practice Test Automation");

    await expect(ele1).toBeVisible();
    await expect(ele2).toBeVisible();
    await expect(ele3).toBeVisible();
});

test('TC_03 - Verify login functionality', async ({ page }) => {
    await loginPractice(page, validUser, validPass);
});

test('TC_04 - Verify landing page after login', async ({ page }) => {
    await loginPractice(page, validUser, validPass);
    expect(await page.title()).toBe("Logged In Successfully | Practice Test Automation");
    await page.waitForTimeout(2000);
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
});

test('TC_05 - Verify test login info is shown in Login page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Practice Test Automation', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Test login' })).toBeVisible();
    await expect(page.getByText('This is a simple Login page.')).toBeVisible();
    await expect(page.getByText('Use next credentials to')).toBeVisible();
});

test('TC_06 - Verify login functionality without entering any credentials', async ({ page }) => {
    const uName: string = testdata.tc06.username;
    const pwd: string = testdata.tc06.password;
    await loginPractice(page, uName, pwd);
});

test('TC_07 - Verify login functionality with empty username', async ({ page }) => {
    const uName: string = testdata.tc07.username;
    const pwd: string = testdata.tc07.password;
    await loginPractice(page, uName, pwd);
});

test('TC_08 - Verify login functionality with empty password', async ({ page }) => {
    const uName: string = testdata.tc08.username;
    const pwd: string = testdata.tc08.password;
    await loginPractice(page, uName, pwd);
});

test('TC_09 - Verify login functionality with invalid username', async ({ page }) => {
    const uName: string = testdata.tc09.username;
    const pwd: string = testdata.tc09.password;
    await loginPractice(page, uName, pwd);
});

test('TC_10 - Verify login functionality with invalid password', async ({ page }) => {
    const uName: string = testdata.tc10.username;
    const pwd: string = testdata.tc10.password;
    await loginPractice(page, uName, pwd);
});

