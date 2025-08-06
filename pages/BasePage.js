const { until } = require('selenium-webdriver');
const config = require('../config');

class BasePage {
    /**
     * @param {import('selenium-webdriver').WebDriver} driver
     * @param {string} baseUrl
     */
    constructor(driver, baseUrl = config.baseUrl) {
        this.driver = driver;
        this.baseUrl = baseUrl;
    }

    async goToSite() {
        await this.driver.get(this.baseUrl);
    }

    /**
     * Универсальный поиск элемента с ожиданием.
     * @param {import('selenium-webdriver').By} locator
     * @param {number} timeout в миллисекундах
     * @param {boolean} waitVisible ждать ли видимость элемента (по умолчанию false)
     * @returns {Promise<WebElement>} найденный элемент
     */
    async findElement(locator, timeout = 5000, waitVisible = false) {
        const element = await this.driver.wait(
            until.elementLocated(locator), timeout,
            `Can't find element by locator ${locator}`
        );

        if (waitVisible) {
            await this.driver.wait(
                until.elementIsVisible(element), timeout,
                `Element located by ${locator} is not visible`
            );
        }
        return element;
    }
}

module.exports = BasePage;