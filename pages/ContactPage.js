const { By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');

const SELECTORS = {
    pageHeader: By.css('h1.h1mid'),
    officeBlocks: By.css('.companydata'),
    companyName: By.css('b'),
    streetAddress: By.css('[itemprop="streetAddress"]'),
    postalCode: By.css('[itemprop="postalCode"]'),
    country: By.css('[itemprop="addressCountry"]'),
    phone: By.css('[itemprop="telephone"] a[href^="tel:"]'),
};

class ContactPage extends BasePage {
    getLocators() {
        return SELECTORS;
    }

    async waitForOfficesToLoad(timeout = 10000) {
        await this.driver.wait(
            until.elementLocated(SELECTORS.officeBlocks),
            timeout,
            'Контактные блоки не появились на странице'
        );
    }

    async getOfficeBlocks() {
        const blocks = await this.driver.findElements(SELECTORS.officeBlocks);
        const filteredBlocks = [];

        for (const block of blocks) {
            try {
                // Проверяем, есть ли название компании внутри блока
                await block.findElement(SELECTORS.companyName);
                filteredBlocks.push(block);
            } catch {
                // Если нет, пропускаем этот блок
                continue;
            }
        }

        return filteredBlocks;
    }
}

module.exports = ContactPage;