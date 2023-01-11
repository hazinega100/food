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