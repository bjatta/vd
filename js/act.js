;(() => {
    let __ = console.log;

    let d = document.querySelector('#vd-main-section');

    let setListeners = () => {
        calc();
        [
            'input[name="netto"]',
            'input[name="netto1"]',
            'input[name="pre_payd1"]',
            'input[name="pre_payd2"]',
            'input[name="pre_payd3"]',
            'input[name="pre_payd4"]',
        ].forEach(cssSelector => {
            "use strict";
            d.querySelector(cssSelector).addEventListener('change', calc);
        });
    };

    let getValue = (htmlNodeWithDate, initialValue = '0') => {
        let amount;
        if (amount = parseFloat(htmlNodeWithDate.value)) return amount;
        else {
            htmlNodeWithDate.value = initialValue;
            return parseFloat(initialValue);
        }
    };

    let calc = () => {
        let total = (getValue(d.querySelector('input[name="netto"]')));
        let fee = (total * .13).toFixed(2);
        let fszn = (total * .01).toFixed(2);
        let toPay = (total - fee - fszn).toFixed(2);
        let diff = (total - toPay - fszn - fee).toFixed(2);
        d.querySelector('#income-fee').innerHTML = 'подоходный: <span>' + fee + ' </span>&nbspруб. ';
        d.querySelector('#FSZN').innerHTML = 'ФСЗН: <span>' + fszn + ' </span>&nbspруб. ';
        d.querySelector('#total').innerHTML = '<p> на руки: <span>' + toPay + ' </span>&nbspруб. </p>';
        if (!diff) {
            d.querySelector('#error').innerHTML = '<p> разница: <span>' + diff + ' </span>&nbspруб. </p>';
        }

        d.querySelector('input[name="netto1"]').value = toPay;

        let total2 = (getValue(d.querySelector('input[name="netto1"]')));
        let avans1 = (getValue(d.querySelector('input[name="pre_payd1"]')));
        let avans2 = (getValue(d.querySelector('input[name="pre_payd2"]')));
        let avans3 = (getValue(d.querySelector('input[name="pre_payd3"]')));
        let avans4 = (getValue(d.querySelector('input[name="pre_payd4"]')));
        toPay2 = total2 - avans1 -avans2 - avans3 - avans4;
        d.querySelector('#total2').innerHTML = '<p> ИТОГО: <span>' + toPay2.toFixed(2) + ' </span>&nbspруб. </p>';
    };

    document.addEventListener("DOMContentLoaded", setListeners);

})();