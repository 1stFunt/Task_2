## Описание
Этот проект автоматизирует парсинг контактных данных офисов с сайта onlyoffice.com с помощью Selenium WebDriver и Node.js.
Используется браузер Mozilla Firefox.
Результаты сохраняются в CSV-файл.

## Использование

1. Установите [Node.js](https://nodejs.org/)
2. Клонируйте репозиторий и перейдите в папку проекта:

   ```bash
   git clone https://github.com/1stFunt/Task_2.git
   cd Task_2
   ```
3. Установите зависимости:

   ```bash
   npm install
   ```
4. Запустите программу:

    ```bash
   node index.js [файл]
   ```
   - [файл] — (опционально) имя файла для сохранения (по умолчанию offices.csv)  
   Пример:
   ```bash
   node index.js myoffices.csv
   ```
5. Запуск тестов:

   ```bash
   npm test
   ```

Тестим CI/CD - попытка 7