// Для курса валют Версы Тревел

  $('.open-popup-versa').click(function () {
    /*e.preventDefault();*/
    $('.popup-bg-versa').fadeIn(600);
  });
  $('.popup-close-versa').click(function () {

    $('.popup-bg-versa').fadeOut(600);
  });


//fetch('https://www.cbr-xml-daily.ru/daily_json.js'.then(function (result) {
//  return result.json()
//})
//.then(function (data) {
//  
// console.log(data)
// }
// ))

//объект с кусами валют
const rates = {};

//элементы для отображения курса
const currency = {};

const elementUSD = document.querySelector('[data-value1="USD"]');
const elementEUR = document.querySelector('[data-value1="EUR"]');
const elementRUB = document.querySelector('[data-value1="RUB"]');
const elementUSDversa = document.querySelector('[data-value="USD"]');
const elementEURversa = document.querySelector('[data-value="EUR"]');
const elementRUBversa = document.querySelector('[data-value="RUB"]');

//Элементы формы, ввод суммы, выбор валюты
const input = document.querySelector('#inputvs');
const result = document.querySelector('#resultvs');
const select = document.querySelector('#selectvs');


const input1 = document.querySelector('.input1');
const result1 = document.querySelector('#result1');
const select1 = document.querySelector('#select1');
const curs = {};

getCurrencies();

//Функция получения курса валют и отображения на странице

async function getCurrencies() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  const result = await data;

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;

  console.log(rates);

  elementUSDversa.textContent = (rates.USD.Value * 1.14).toFixed(2);
  elementEURversa.textContent = (rates.EUR.Value * 1.14).toFixed(2);
  elementRUBversa.textContent = (rates.RUB.Value * 1.14).toFixed(2);
}

//Слушаем изменения в модальном окне
input.oninput = convertValue;
select.oninput = convertValue;
input.oninput = convertVs;
select.oninput = convertVs;

//Функция конвертации
function convertValue() {
  result.value = (parseFloat(input.value * 1.14) * rates[select.value].Value).toFixed(1);
  
}
/*
function convertVs() {
  result1.value = (parseFloat(input.value * 1.14) * rates[select.value].Value).toFixed(1);
  
}
*/
getCb();

async function getCb() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  let result;

  result = await data;

  currency.USD = result.Valute.USD;
  currency.EUR = result.Valute.EUR;

  elementUSD.textContent = currency.USD.Value.toFixed(2) ;
  elementEUR.textContent = currency.EUR.Value.toFixed(2) ;
}

rates.USD.Value > rates.USD.Previous ? elementUSD.classList.add('top') : elementUSD.classList.add('bottom');


/*
getVs();

async function getCb() {
  const response1 = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data1 = await response1.json();
  let result1;

  result1 = await data1;

  curs.USD = result1.Valute.USD;
  curs.EUR = result1Valute.EUR;
  curs.RUB = result.Valute.RUB;

  elementUSD.textContent = curs.USD.Value.toFixed(2);
  elementEUR.textContent = curs.EUR.Value.toFixed(2);
  elementRUB.textContent = curs.RUB.Value.toFixed(2);
}

;

*/
