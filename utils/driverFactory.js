const { Builder } = require('selenium-webdriver');
const config = require('../config');

/**
 * Фабрика для создания WebDriver на основе настроек из конфига
 * @returns {import('selenium-webdriver').WebDriver}
 */
function createDriver() {
    return new Builder().forBrowser(config.browser).build();
}

module.exports = { createDriver };