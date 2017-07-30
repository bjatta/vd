'use strict';

;(function () {
    var __ = console.log;

    var d = document.querySelector('#vd-main-section');

    var setListeners = function setListeners() {
        calc();
        ['input[name="netto"]', 'input[name="netto1"]', 'input[name="pre_payd1"]', 'input[name="pre_payd2"]', 'input[name="pre_payd3"]', 'input[name="pre_payd4"]'].forEach(function (cssSelector) {
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

    var calc = function calc() {
        var total = getValue(d.querySelector('input[name="netto"]'));
        var fee = (total * .13).toFixed(2);
        var fszn = (total * .01).toFixed(2);
        var toPay = (total - fee - fszn).toFixed(2);
        var diff = (total - toPay - fszn - fee).toFixed(2);
        d.querySelector('#income-fee').innerHTML = 'подоходный: <span>' + fee + ' </span>&nbspруб. ';
        d.querySelector('#FSZN').innerHTML = 'ФСЗН: <span>' + fszn + ' </span>&nbspруб. ';
        d.querySelector('#total').innerHTML = '<p> на руки: <span>' + toPay + ' </span>&nbspруб. </p>';
        if (!diff) {
            d.querySelector('#error').innerHTML = '<p> разница: <span>' + diff + ' </span>&nbspруб. </p>';
        }

        d.querySelector('input[name="netto1"]').value = toPay;

        var total2 = getValue(d.querySelector('input[name="netto1"]'));
        var avans1 = getValue(d.querySelector('input[name="pre_payd1"]'));
        var avans2 = getValue(d.querySelector('input[name="pre_payd2"]'));
        var avans3 = getValue(d.querySelector('input[name="pre_payd3"]'));
        var avans4 = getValue(d.querySelector('input[name="pre_payd4"]'));
        var toPay2 = total2 - avans1 - avans2 - avans3 - avans4;
        d.querySelector('#total2').innerHTML = '<p> ИТОГО: <span>' + toPay2.toFixed(2) + ' </span>&nbspруб. </p>';
    };

    document.addEventListener("DOMContentLoaded", setListeners);
})();