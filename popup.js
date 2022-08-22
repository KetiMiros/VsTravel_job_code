 $(document).ready(function($) {                                 //открытие по клику
    $('.open-popup-versa').click(function() {
        $('.popup-bg-versa').fadeIn(600);
        return false;
    });
     
    $('.popup-close').click(function() {
        $(this).parents('.popup-bg-versa').fadeOut(600);           //закрытие по клику
        return false;
    });    
  
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('.popup-bg-versa').fadeOut(600);                     //закрытие при нажатии Esc 
        }
    });
     
    $('.popup-bg-versa').click(function(e) {
        if ($(e.target).closest('.popup-versa').length == 0) {     //закрытие при нажатии на фон
            $(this).fadeOut(600);                 
        }
    });
});

    /* функция закрытия*/

   $(document).ready(function($) {
      // Нажатие "Закрыть"
      $('.popup-close-versa').click(function() {
          $(this).parents('.popup-bg-versa').fadeOut(600);
          return false;
      });       

    });
    $('.popup-bg-versa').click(function(e) {
          if ($(e.target).closest('.popup-versa').length == 0) {
              $(this).fadeOut(600);                 
          }
      });
  $(document).keydown(function(e) {
          if (e.keyCode === 27) {
              e.stopPropagation();
              $('.popup-bg-versa').fadeOut(600);
          }
      });

    
    const rates = {};                                                           //объект с куpсами валют

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
          
        getCb();
        
