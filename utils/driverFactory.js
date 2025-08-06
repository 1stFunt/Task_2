const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const config = require('../config');

function createDriver() {
    if (process.env.GITHUB_ACTIONS) {
        // В GitHub Actions явно указываем путь к бинарнику Firefox
        let options = new firefox.Options();
        options.setBinary('/usr/bin/firefox'); // Проверить, что этот путь корректен на runner-е

        return new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
    }

    // Локально просто берем из конфига
    return new Builder()
        .forBrowser(config.browser)
        .build();
}

module.exports = { createDriver };