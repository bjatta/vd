'use strict';

;(function () {
    var __ = console.log;

    var today = function today() {
        var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        if (!now) {
            --yyyy;
        }

        return yyyy + '-' + mm + '-' + dd;
    };

    var d = document.querySelector('#vd-main-section');

    var setListeners = function setListeners() {
        d.querySelector('input[name="ends_at"]').value = today();
        d.querySelector('input[name="starts_at"]').value = today(false);
        calc();
        ['input[name="ends_at"]', 'input[name="starts_at"]', 'input[name="days"]', 'input[name="contract_days"]'].forEach(function (cssSelector) {
            d.querySelector(cssSelector).addEventListener('change', calc);
            d.querySelector(cssSelector).addEventListener('click', calc);
            d.querySelector(cssSelector).addEventListener('keyup', calc);
        });
    };

    var checkDate = function checkDate(htmlNodeWithDate, initialValue) {
        var date1 = void 0;
        if (date1 = Date.parse(htmlNodeWithDate.value)) return date1;else {
            htmlNodeWithDate.value = initialValue;
            return Date.parse(initialValue);
        }
    };

    var calc = function calc() {
        var daysDone = void 0;
        daysDone = (checkDate(d.querySelector('input[name="ends_at"]'), today()) - checkDate(d.querySelector('input[name="starts_at"]'), "2015-07-02")) / (60 * 60 * 24 * 1000);
        var monthesDone = void 0;
        monthesDone = Math.round(daysDone / 29.7);
        d.querySelector('div').innerHTML = '<p>' + daysDone + ' дн. ' + monthesDone + ' мес.</p>' + 'Количество дней трудового отпуска: <span>' + (Math.round(d.querySelector('input[name="days"]').value / 12 * monthesDone) - parseInt(d.querySelector('input[name="contract_days"]').value) + '&nbsp;</span>');
    };

    document.addEventListener("DOMContentLoaded", setListeners);
})();