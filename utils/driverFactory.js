const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const config = require('../config');

/**
 * Фабрика для создания WebDriver на основе настроек из конфига
 * @returns {import('selenium-webdriver').WebDriver}
 */
function createDriver() {
    if (process.env.GITHUB_ACTIONS) {
        // В GitHub Actions явно указываем путь к Firefox (установленному из PPA)
        const options = new firefox.Options();
        options.setBinary('/snap/bin/firefox');

        return new Builder()
            .forBrowser(config.browser)
            .setFirefoxOptions(options)
            .build();
    } else {
        // Локальный запуск — просто браузер из конфига
        return new Builder().forBrowser(config.browser).build();
    }
}

module.exports = { createDriver };