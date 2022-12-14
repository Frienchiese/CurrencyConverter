const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

const fromCurrency = document.querySelector('[name="from_currency"]');
const toCurrency = document.querySelector('[name="to_currency"]');
const fromAmount = document.querySelector('[name="from_amount"]');
const toAmount = document.querySelector('.to_amount');
const endpoint = 'https://api.exchangerate.host/convert';
const form = document.querySelector('.app form');
const ratesByBase = {};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
    )
    .join('');
}

async function fetchData(from, to) {
  const response = await fetch(`${endpoint}?from=${from}&to=${to}`);
  const data = await response.json();
  //console.log(data.result);
  return data.result;
}

async function convert(from, to, amount) {
  const rate = await fetchData(from, to);
  const convertedAmount = rate * amount;
  return convertedAmount;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(e) {
  const amount = fromAmount.value;
  const rawAmount = await convert(fromCurrency.value, toCurrency.value, amount);
  toAmount.textContent = formatCurrency(rawAmount, toCurrency.value);
}

const optionsHTML = generateOptions(currencies);
fromCurrency.innerHTML = optionsHTML;
toCurrency.innerHTML = optionsHTML;
form.addEventListener('input', handleInput);
//fetchData();