/**
 * Контактные тесты на основе Selenium + Node.js + assert
 *
 * Для более компактного и масштабируемого подхода рекомендуется использовать, например, Playwright.
 */

const assert = require('assert');
const { createDriver } = require('../utils/driverFactory');
const OnlyOfficePage = require('../pages/OnlyOfficePage');
const ContactPage = require('../pages/ContactPage');
const ContactParser = require('../parsers/ContactParser');

(async function runContactsTests() {
    const driver = await createDriver();
    const mainPage = new OnlyOfficePage(driver);
    const contactPage = new ContactPage(driver);

    try {
        console.log('\n--- Запуск Test 1: переход и базовая проверка ---');
        await mainPage.open();
        await mainPage.goToContacts();
        // Проверка URL
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('contacts.aspx'), '❌ URL не содержит contacts.aspx');
        // Проверка заголовка страницы
        const headerEl = await contactPage.findElement(contactPage.getLocators().pageHeader, 5000, true);
        const headerText = await headerEl.getText();
        assert.ok(/contact/i.test(headerText), '❌ Заголовок не содержит "contact"');
        console.log('✅ Test 1 пройден: переход на Contacts и базовые проверки');

        console.log('\n--- Запуск Test 2: структура первого офисного блока ---');
        await contactPage.waitForOfficesToLoad(10000);
        const officeBlocks = await contactPage.getOfficeBlocks();
        if (officeBlocks.length === 0) {
            console.log('⚠️ Контактные блоки не найдены — Test 2 пропущен');
        } else {
            const parser = new ContactParser(officeBlocks, contactPage.getLocators());
            const parsed = await parser.parseAll();
            const first = parsed[0];
            assert.ok(first.companyName.length > 0, '❌ companyName пустой');
            assert.ok(first.fullAddress.length > 0, '❌ fullAddress пустой');
            console.log('✅ Test 2 пройден: структура офиса валидна');
        }

    } catch (err) {
        console.error('\n❌ Тест завершился с ошибкой:', err.message);
        process.exitCode = 1;
    } finally {
        await driver.quit();
    }
})();