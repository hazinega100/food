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