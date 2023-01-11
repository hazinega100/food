/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem == 'sex';
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem == 'ratio';
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector} div`);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSetting('#gender', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    // Куда будет произведен клик, те дынные из data-атрибута будут получены
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynemicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynemicInformation('#height');
    getDynemicInformation('#weight');
    getDynemicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    // 4 Cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 64;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            // если пользователь не передалл ни один из классов, тогда подставлять класс по умолчанию
            if (this.classes === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                `;
            this.parent.append(element);
            element.classList.add('menu__item');
            // menuField.append(element);
        }
    }

    // Создаем ф-цию получения данных от сервера
    const getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // Вызываем ф-цию
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // Используем библиотеку Axios для получения GET запроса
    axios.get('http://localhost:3000/menu')
        .then(item => {
            item.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Статичный способ создания карточек:
    // const menuFit = new MenuCard(
    //     '../img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     14,
    //     '.menu .container'
    // );
    // const menuElit = new MenuCard(
    //     '../img/tabs/elite.jpg',
    //     'vegy',
    //     'Меню "Премиум"',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     24,
    //     '.menu .container',
    //     'menu__item'
    // );
    // const menuPost = new MenuCard(
    //     '../img/tabs/post.jpg',
    //     'vegy',
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     9,
    //     '.menu .container',
    //     'menu__item'
    // );

    // menuFit.render();
    // menuElit.render();
    // menuPost.render();
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    // Forms

    const forms = document.querySelectorAll('form');

    // Создаем объект со списком фраз для вывода в различных ситуациях
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Запускаем перебор, что бы все формы на странице работали одинакого
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await res.json();
    };
    // Создаем ф-цию для отправки данных на сервер
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            // Отмена стандартного поведения браузера
            e.preventDefault();

            // Создаем элемент который будет отображать статус запроса на странице
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // showThanksModal(message.loading);
            // Выводим статус загрузки данных при обмене с сервером
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // Создаем запрос
            // const request = new XMLHttpRequest();
            // Используем метод open что бы настроить этот запрос, указав метод отправки данных POST и ссылку на сервер URL
            // request.open('POST', 'server.php');
            // Есть два способа конвертации данных - FormData и JSON
            // Используем FormData для конвертации данных (из формы) введенных пользователем, в объект
            // Важно что бы в верстке в form у элементов данные с которых будут идти на сервер (input, option, textaria и т.д.) был указан атрибут name="", иначе FormData не сможет найти этот элемент и взять его value

            // При использовании FormData без конвертации в JSON не нужно использовать метод setRequestHeader, он прописывается автоматически
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // Для формата JSON заголовок нужен, хотя без него тоже все работает
            // request.setRequestHeader('Content-type', 'application/json');
            // Создаем объект FormData в который будут записываться данные введенные пользователем в form
            const formData = new FormData(form);

            // ! Вариант с использованием JSON
            // Поскольку FormData спецефический объект, создаем обычный объект - перебираем св-ва и значения записаные в FormData - записываем их в новый объект 
            // Старый способ
            // let object = {};

            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });

            // Современный способ
            // Сначала преобразует firmData в матрицу (масивы в массиве), а потом обратно в обычный объект
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Вызываем метод send (отправка) и указываем новосозданный объект formData которая была создана во время заполнения клиентом формы
            // request.send(formData);
            // Отправляем на сервер объект в формате JSON
            // request.send(JSON.stringify(object));

            // Используем современную технологию работы с сервером fetch API
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

            // Навешиваем обработчик событий на запрос, говорим что отслеживаем 'load' - конечную загрузку нашего запроса
            // request.addEventListener('load', () => {
            //     // Проверяем наш запрос на готовность (200)
            //     if (request.status === 200) {
            //         // Смотрим в консоли свойство response (ответ) на запрос
            //         console.log(request.response);
            //         // Выводим статус успешной загрузки данных при обмене с сервером
            //         // statusMessage.textContent = message.success;
            //         showThanksModal(message.success);
            //         // Очистить форму от введенных данных
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         // Выводим статус ошибки при загрузке данных при обмене с сервером
            //         // statusMessage.textContent = message.failure;
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.hidden = true;
        openModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>  
        `;
        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.hidden = false;
            closeModalWindow();
        }, 3000);
    }
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {

    //  3 Modal

    const btnsOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModalWindow() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Если пользователь открыл модельное окно сам, тогда таймер отключится
        clearInterval(modalTimerId);
    }

    function closeModalWindow() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    btnsOpen.forEach(btn => {
        btn.addEventListener('click', openModalWindow);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') {
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(openModalWindow, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();

            window.removeEventListener('scroll', showModalByScroll);
            clearInterval(modalTimerId);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        // 8) Кол-во слайдов и какой именно номер слайда 
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    // 1) Создаем индекс для подсчета кол-ва слайдов
    let slideIndex = 1;
    // 7) Запускаем ф-цию с первым слайдером
    showSlides(slideIndex);
    // 8)Показывает общее кол-во слайдов
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        // 2) Если slideIndex превышает кол-во слайдов, устанавливать ему значение первого слайда
        if (n > slides.length) {
            slideIndex = 1;
        }
        // 3) Если slideIndex меньше 1, тогда устанавливать ему значение общего кол-ва слайдов
        if (n < 1) {
            slideIndex = slides.length;
        }
        // 4) Убираем все слайдеры со страницы
        slides.forEach((item) => item.style.display = 'none');
        // 5) Показываем на странице первый слайд
        slides[slideIndex - 1].style.display = 'block';
        // 9) Показывает текущий слайд
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    // 6) Ф-ция изменяющая slideIndex (при отрицательном аргументе, будет вычитать индекс)
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    // 1 Tabs

    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hiddenTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hiddenTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    // 2 Timer

    const deadline = "2023-01-01";

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const total = Date.parse(endtime) - Date.parse(new Date());
        // Таким способом мы спарсим (числа из строки переведем в миллисекунды) и вычтем из конечного времени настоящее
        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            // Умножаем 1000 миллисек на 60 - получаем минуту,
            // умножаем минуту на 60 - получаем часы,
            // умножаем часы на 24 - получаем кол-во миллисек в сутках,
            // Делим разницу миллисек между конечным и настоящим временем на кол-во миллисек в сутках - получаем 
            // количество дней до deadline
            hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            // (t/(1000*60*60)) - получаем полное количество часов в миллисек в разнице между конечным и настоящим 
            // временем, % 24 - получаем остаток часов от оставшихся суток
            minutes = Math.floor((total / 1000 / 60) % 60);
            // (t / 1000 / 60) - получаем кол-во минут
            // % 60 - получаем остаток минут
            seconds = Math.floor((total / 1000) % 60);
            // (t / 1000) - получаем кол-во секунд
            // % 60 - получаем остаток секунд
        }

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    // Фу-ция подставляет ноль, когда число меньше 10

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            // Запускает таймер каждую секунду
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            // Подставляет полученные значения из getTimeRemaining на страницу 
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Останавливает таймер, когда он дойдет до нуля
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    modal();
    forms();
    calc();
    cards();
    slider();
    timer();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map