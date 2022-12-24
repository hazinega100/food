"use strict";

window.addEventListener('DOMContentLoaded', () => {

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

    //  3 Modal

    const btnsOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModalWindow() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Если пользователь открыл модельное окно сам, тогда таймер отключится
        // clearInterval(modalTimerId);
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

    const menuFit = new MenuCard(
        '../img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        14,
        '.menu .container'
    );
    const menuElit = new MenuCard(
        '../img/tabs/elite.jpg',
        'vegy',
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        24,
        '.menu .container',
        'menu__item'
    );
    const menuPost = new MenuCard(
        '../img/tabs/post.jpg',
        'vegy',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        '.menu .container',
        'menu__item'
    );

    menuFit.render();
    menuElit.render();
    menuPost.render();

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
        postData(item);
    });
    // Создаем ф-цию для отправки данных на сервер
    function postData(form) {
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
            const request = new XMLHttpRequest();
            // Используем метод open что бы настроить этот запрос, указав метод отправки данных POST и ссылку на сервер URL
            request.open('POST', 'server.php');
            // Есть два способа конфертации данных - FormData и JSON
            // Используем FormData для конвертации данных (из формы) введенных пользователем, в объект
            // Важно что бы в верстке в form у элементов данные с которых будут идти на сервер (input, option, textaria и т.д.) был указан атрибут name="", иначе FormData не сможет найти этот элемент и взять его value

            // При использовании XMLHttpRequest не нужно использовать метод setRequestHeader
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // Для формата JSON заголовок нужен, хотя без него тоже все работает
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            // ! Вариант с использованием JSON
            // Поскольку FormData спецефический объект, создаем обычный объект - перебираем св-ва и значения записаные в FormData - записываем их в новый объект 
            let object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            // Вызываем метод send (отправка) и указываем новосозданный объект formData которая была создана во время заполнения клиентом формы
            // request.send(formData);
            // Отправляем на сервер объект в формате JSON
            request.send(JSON.stringify(object));

            // Навешиваем обработчик событий на запрос, говорим что отслеживаем 'load' - конечную загрузку нашего запроса
            request.addEventListener('load', () => {
                // Проверяем наш запрос на готовность (200)
                if (request.status === 200) {
                    // Смотрим в консоли свойство response (ответ) на запрос
                    console.log(request.response);
                    // Выводим статус успешной загрузки данных при обмене с сервером
                    // statusMessage.textContent = message.success;
                    showThanksModal(message.success);
                    // Очистить форму от введенных данных
                    form.reset();
                    statusMessage.remove();
                } else {
                    // Выводим статус ошибки при загрузке данных при обмене с сервером
                    // statusMessage.textContent = message.failure;
                    showThanksModal(message.failure);
                }
            });
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
});