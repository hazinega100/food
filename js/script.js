"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        forms = require('./modules/forms'),
        calc = require('./modules/calc'),
        cards = require('./modules/cards'),
        slider = require('./modules/slider'),
        timer = require('./modules/timer');

    tabs();
    modal();
    forms();
    calc();
    cards();
    slider();
    timer();
});