/**
 * Контактные тесты на основе Selenium + Node.js + assert
 * Для более компактного и масштабируемого подхода рекомендуется использовать, например, Playwright.
 */

const assert = require('assert');
const { createDriver } = require('../utils/driverFactory');
const OnlyOfficePage = require('../pages/OnlyOfficePage');
const ContactPage = require('../pages/ContactPage');
const ContactParser = require('../parsers/ContactParser');

// beforeEach: инициализация + переход на страницу контактов
async function beforeEach() {
    const driver = await createDriver();
    const mainPage = new OnlyOfficePage(driver);
    const contactPage = new ContactPage(driver);
    await mainPage.open();
    await mainPage.goToContacts();
    return { driver, mainPage, contactPage };
}

// afterEach: закрытие драйвера
async function afterEach(driver) {
    await driver.quit();
}

// Тест 1: Проверка URL и заголовка страницы
async function test1() {
    const { driver, contactPage } = await beforeEach();
    try {
        console.log('\n--- Запуск Test 1: переход и базовая проверка ---');
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('contacts.aspx'), '❌ URL не содержит contacts.aspx');
        const headerEl = await contactPage.findElement(contactPage.getLocators().pageHeader, 5000, true);
        const headerText = await headerEl.getText();
        assert.ok(/contact/i.test(headerText), '❌ Заголовок не содержит "contact"');
        console.log('✅ Test 1 пройден');
    } finally {
        await afterEach(driver);
    }
}

// Тест 2: Проверка структуры офисного блока
async function test2() {
    const { driver, contactPage } = await beforeEach();
    try {
        console.log('\n--- Запуск Test 2: структура первого офисного блока ---');
        await contactPage.waitForOfficesToLoad(10000);
        const officeBlocks = await contactPage.getOfficeBlocks();
        if (officeBlocks.length === 0) {
            console.log('⚠️ Контактные блоки не найдены — Test 2 пропущен');
            return;
        }
        const parser = new ContactParser(officeBlocks, contactPage.getLocators());
        const parsed = await parser.parseAll();
        const first = parsed[0];
        assert.ok(first.companyName.length > 0, '❌ companyName пустой');
        assert.ok(first.fullAddress.length > 0, '❌ fullAddress пустой');
        console.log('✅ Test 2 пройден');
    } finally {
        await afterEach(driver);
    }
}

// Запуск всех тестов
(async () => {
    const tests = [test1, test2];
    for (let i = 0; i < tests.length; i++) {
        try {
            await tests[i]();
        } catch (error) {
            console.error(`❌ Test ${i + 1} завершился с ошибкой:`, error.message);
        }
    }
})();