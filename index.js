const { createDriver } = require('./utils/driverFactory');  // Функция создания драйвера браузера
const OnlyOfficePage = require('./pages/OnlyOfficePage');    // Класс для работы с главной страницей и меню
const ContactPage = require('./pages/ContactPage');          // Класс для работы со страницей контактов
const ContactParser = require('./parsers/ContactParser');    // Парсер для извлечения данных офисов
const fs = require('fs');    // Модуль Node.js для работы с файловой системой (чтение/запись файлов)
const path = require('path'); // Модуль Node.js для работы с путями к файлам и папкам

async function main(outputFilePath) {
    const driver = createDriver();  // Создаём экземпляр браузера (например, Firefox)

    try {
        // Открываем главную страницу onlyoffice.com
        const onlyOfficePage = new OnlyOfficePage(driver);
        await onlyOfficePage.goToSite();

        // Переходим через меню Resources -> Contacts
        await onlyOfficePage.goToContacts();

        // Создаём объект страницы контактов и получаем блоки с офисами
        const contactPage = new ContactPage(driver);
        const officeElements = await contactPage.getOfficeBlocks();

        // Парсим данные офисов из полученных элементов
        const parser = new ContactParser(officeElements, contactPage.getLocators());
        const offices = await parser.parseAll();

        // Формируем CSV-текст из полученных данных
        const csvHeader = 'Country;CompanyName;FullAddress\n';
        const csvBody = offices.map(({ country, companyName, fullAddress }) =>
            `${country};${companyName};${fullAddress.replace(/\n/g, ' ').replace(/;/g, ',')}`
        ).join('\n');

        // Записываем CSV в файл по указанному пути
        fs.writeFileSync(outputFilePath, csvHeader + csvBody, 'utf-8');

        console.log(`Данные сохранены в файл: ${outputFilePath}`);
    } catch (err) {
        console.error('Ошибка при выполнении скрипта:', err);
    } finally {
        await driver.quit();  // Закрываем браузер
    }
}

// Получаем путь к файлу из аргументов командной строки или используем дефолт
const outputPath = process.argv[2] || path.resolve(__dirname, 'offices.csv');
main(outputPath);