'use strict';

;(function () {
    var __ = console.log;
    var direction = 'down';
    var d = document.querySelector('#vd-main-section');

    var setListeners = function setListeners() {
        calc();
        ['input[name="tariff"]', 'select[name="select-honor"]', 'input[name="toPay"]'].forEach(function (cssSelector) {
            "use strict";

            d.querySelector(cssSelector).addEventListener('change', calc);
        });
    };

    var getValue = function getValue(htmlNodeWithDate) {
        var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';

        var amount = void 0;
        if (amount = parseFloat(htmlNodeWithDate.value)) return amount;else {
            htmlNodeWithDate.value = initialValue;
            return parseFloat(initialValue);
        }
    };

    var calc = function calc(ev) {
        var toPay = void 0;
        var fee = void 0;
        var fszn = void 0;
        var total = void 0;
        var tariff = void 0;
        var honor = void 0;
        var diff = void 0;

        if (ev) {
            if (ev.target.name == 'tariff') {
                direction = "down";
            }
            if (ev.target.name == 'toPay') {
                direction = "up";
            }
        }
        if (direction == 'down') {
            tariff = getValue(d.querySelector('input[name="tariff"]')) * 1;
            honor = tariff * [0, .5, .3][getValue(d.querySelector('select[name="select-honor"]'))];
            total = tariff + honor;
            fee = (total * .13).toFixed(2) * 1;
            fszn = (total * .01).toFixed(2) * 1;
            toPay = (total - fee - fszn).toFixed(2);
            d.querySelector('input[name="toPay"]').value = toPay;
        } else {
            toPay = getValue(d.querySelector('input[name="toPay"]')) * 1;
            fee = (toPay * .13).toFixed(2) * 1;
            fszn = (toPay * .01).toFixed(2) * 1;
            total = toPay + fee + fszn;
            tariff = (total / (1 + [0, .5, .3][getValue(d.querySelector('select[name="select-honor"]'))])).toFixed(2);
            honor = (total - tariff).toFixed(2) * 1;
            d.querySelector('input[name="tariff"]').value = tariff;
        }
        diff = (toPay - total - fszn - fee).toFixed(2);
        d.querySelector('#total').innerHTML = '<span><strong>' + total + ' </strong></span>&nbspруб. ';
        d.querySelector('#honor').innerHTML = 'премия: <span>' + honor + ' </span>&nbspруб. ';
        d.querySelector('#income-fee').innerHTML = 'подоходный: ' + fee + ' &nbspруб. ';
        d.querySelector('#FSZN').innerHTML = 'ФСЗН: ' + fszn + ' &nbspруб. ';
        d.querySelector('#totalfee').innerHTML = '<p>удержаний: <span>' + (fee + fszn) + ' </span>&nbspруб. </p>';
        if (!diff) {
            d.querySelector('#error').innerHTML = '<p> разница: <span>' + diff + ' </span>&nbspруб. </p>';
        }
    };
    document.addEventListener("DOMContentLoaded", setListeners);
})();