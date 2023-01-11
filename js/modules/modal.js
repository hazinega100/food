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