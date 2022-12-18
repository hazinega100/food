"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

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

    // Timer

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

    // Modal

    const btnsOpen = document.querySelectorAll('[data-modal]'),
        btnClose = document.querySelector('[data-close]'),
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

    btnClose.addEventListener('click', closeModalWindow);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') {
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(openModalWindow, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();

            window.removeEventListener('scroll', showModalByScroll);
            clearInterval(modalTimerId);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});