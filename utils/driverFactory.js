const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const config = require('../config');

/**
 * Фабрика для создания WebDriver на основе настроек из конфига
 * @returns {import('selenium-webdriver').WebDriver}
 */
function createDriver() {
    if (process.env.GITHUB_ACTIONS) {
        // В GitHub Actions явно указываем путь к Firefox
        let options = new firefox.Options();
        options.setBinary('/usr/bin/firefox'); // путь для Ubuntu runner в GH Actions

        return new Builder()
            .forBrowser(config.browser)
            .setFirefoxOptions(options)
            .build();
    } else {
        // Локально — дефолт
        return new Builder().forBrowser(config.browser).build();
    }
}

module.exports = { createDriver };