const { By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');

const LOCATORS = {
    resourcesMenu: By.id('navitem_about'),
    resourcesMenuDropdown: By.id('navitem_about_menu'),
    contactsLink: By.id('navitem_about_contacts'),
};

class OnlyOfficePage extends BasePage {
    // Открыть главную страницу
    async open() {
        await this.goToSite();
    }

    // Навести курсор на меню Resources и дождаться раскрытия подменю
    async hoverResourcesMenu() {
        const resourcesMenu = await this.findElement(LOCATORS.resourcesMenu, 5000, true);
        await this.driver.actions({ bridge: true }).move({ origin: resourcesMenu }).perform();

        const dropdown = await this.findElement(LOCATORS.resourcesMenuDropdown, 5000, true);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);
    }

    // Кликнуть по ссылке Contacts и дождаться загрузки страницы
    async clickContacts() {
        const contactsLink = await this.findElement(LOCATORS.contactsLink, 5000, true);
        await contactsLink.click();
        await this.driver.wait(until.titleContains('Contacts'), 5000);
    }

    // Полный переход на страницу Contacts через меню Resources
    async goToContacts() {
        await this.hoverResourcesMenu();
        await this.clickContacts();
    }
}

module.exports = OnlyOfficePage;