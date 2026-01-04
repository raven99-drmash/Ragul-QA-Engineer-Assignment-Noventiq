import { Page, Locator } from '@playwright/test';

export class RoadmapHome {
    private readonly page: Page;
    private readonly userName: Locator;
    private readonly pwd: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.pwd = page.locator('#password');
    }

    get login(): Locator {
        return this.page.locator(`a[href='/login']`);
    }
    get premium(): Locator {
        return this.page.locator(`a[href='/premium']`);
    }

    async printText() {
        console.log(await this.premium.textContent());
    }

    static printTime() {
        console.log(Date.now());
    }

}