const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const config = require('../config');

/**
 * Фабрика для создания WebDriver на основе настроек из конфига
 * @returns {import('selenium-webdriver').WebDriver}
 */
function createDriver() {
    const options = new firefox.Options();
    if (process.env.GITHUB_ACTIONS) {
        // В GitHub Actions явно указываем путь
        options.setBinary('/usr/bin/firefox');
    }
    // В локальном запуске не меняем бинарь, используем браузер из конфига
    return new Builder()
        .forBrowser(config.browser)
        .setFirefoxOptions(options)
        .build();
}

module.exports = { createDriver };