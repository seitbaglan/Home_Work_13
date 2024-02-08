async function getCurrencies() {
    const currencies = ['USD', 'EUR', 'KZT'];
    const rates = {};

    for (const currency of currencies) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/2b8b7acfe42a05b5262e8a74/latest/${currency}`);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const data = await response.json();
            rates[currency] = data.conversion_rates;
        } catch (error) {
            console.error(`Произошла ошибка: ${error.message}`);
            rates[currency] = null; 
        }
    }
return rates;
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amountInput').value;

    const rates = await getCurrencies();
    const rate = rates[fromCurrency][toCurrency];

    const result = amount * rate;
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(1)} ${toCurrency}`;
}
