function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activClass) {
    // 1 Tabs

    let tabs = document.querySelectorAll(tabsSelector);
    let tabContent = document.querySelectorAll(tabsContentSelector);
    let tabsParent = document.querySelector(tabsParentSelector);

    function hiddenTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activClass);
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add(activClass);
    }

    hiddenTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;