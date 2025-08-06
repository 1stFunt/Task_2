class ContactParser {
    constructor(officeElements, selectors) {
        this.officeElements = officeElements;
        this.selectors = selectors;
    }

    async parseOffice(officeElement) {
        const getTextSafe = async (parent, selector) => {
            try {
                return await parent.findElement(selector).getText();
            } catch {
                return '';
            }
        };

        const { companyName } = this.selectors;
        const companyNameText = await getTextSafe(officeElement, companyName);
        const fullText = await officeElement.getText();
        // Убираем название компании из полного текста, оставляем только адрес+телефон
        const fullAddress = fullText.replace(companyNameText, '').trim();
        // В качестве "страны" попытаемся вытащить первую строку или оставим пусто
        const firstLine = fullAddress.split('\n')[0]?.trim() || '';

        return {
            country: firstLine,
            companyName: companyNameText,
            fullAddress: fullAddress.replace(/\n/g, ' ')
        };
    }

    async parseAll() {
        const results = [];
        for (const officeElement of this.officeElements) {
            results.push(await this.parseOffice(officeElement));
        }
        return results;
    }
}

module.exports = ContactParser;