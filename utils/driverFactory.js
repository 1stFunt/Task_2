const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const config = require('../config');

/**
 * Фабрика для создания WebDriver на основе настроек из конфига
 * @returns {import('selenium-webdriver').WebDriver}
 */
function createDriver() {
    const options = new firefox.Options();
    // В CI (GitHub Actions) запускаем Firefox в headless режиме, так как там нет GUI
    if (process.env.GITHUB_ACTIONS) {
        options.setBinary('/usr/bin/firefox'); // или /snap/bin/firefox в зависимости от окружения
        options.addArguments('-headless'); // включаем headless в CI
    }
    // В локальном запуске не меняем бинарь, используем браузер из конфига
    return new Builder()
        .forBrowser(config.browser)
        .setFirefoxOptions(options)
        .build();
}

module.exports = { createDriver };