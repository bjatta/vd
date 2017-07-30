;(() => {
    let __ = console.log;
    let direction = 'down';

    let d = document.querySelector('#vd-main-section');

    let setListeners = () => {
        calc();
        [
            'input[name="tariff"]',
            'select[name="select-honor"]',
            'input[name="toPay"]',
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

    let calc = (ev) => {
        if (ev) {
            if (ev.target.name == 'tariff'){
                direction = "down";
            }
            if (ev.target.name == 'toPay'){
                direction = "up";
            }
        }
        if (direction=='down') {
            let tariff = (getValue(d.querySelector('input[name="tariff"]'))) * 1;
            let honor = tariff * [0, .5, .3][getValue(d.querySelector('select[name="select-honor"]'))];
            let total = tariff + honor;
            let fee = (total * .13).toFixed(2) * 1;
            let fszn = (total * .01).toFixed(2) * 1;
            let toPay = (total - fee - fszn).toFixed(2);
            let diff = (toPay - total - fszn - fee).toFixed(2);
            d.querySelector('#total').innerHTML = '<span><strong>' + total + ' </strong></span>&nbspруб. ';
            d.querySelector('#honor').innerHTML = 'премия: <span>' + honor + ' </span>&nbspруб. ';
            d.querySelector('#income-fee').innerHTML = 'подоходный: ' + fee + ' &nbspруб. ';
            d.querySelector('#FSZN').innerHTML = 'ФСЗН: ' + fszn + ' &nbspруб. ';
            d.querySelector('#totalfee').innerHTML = '<p>удержаний: <span>' + (fee + fszn) + ' </span>&nbspруб. </p>';
            if (!diff) {
                d.querySelector('#error').innerHTML = '<p> разница: <span>' + diff + ' </span>&nbspруб. </p>';
            }

            d.querySelector('input[name="toPay"]').value = toPay;
        }else {
            let toPay = (getValue(d.querySelector('input[name="toPay"]'))) * 1;
            let fee = (toPay * .13).toFixed(2) * 1;
            let fszn = (toPay * .01).toFixed(2) * 1;
            let total = toPay + fee + fszn;
            let tariff = total /( 1 + [0, .5, .3][getValue(d.querySelector('select[name="select-honor"]'))]);
                tariff = tariff.toFixed(2)*1;
            let honor = (total - tariff).toFixed(2)*1;
            let diff = (toPay - total - fszn - fee).toFixed(2);
            d.querySelector('#total').innerHTML = '<span><strong>' + total + ' </strong></span>&nbspруб. ';
            d.querySelector('#honor').innerHTML = 'премия: <span>' + honor + ' </span>&nbspруб. ';
            d.querySelector('#income-fee').innerHTML = 'подоходный: ' + fee + ' &nbspруб. ';
            d.querySelector('#FSZN').innerHTML = 'ФСЗН: ' + fszn + ' &nbspруб. ';
            d.querySelector('#totalfee').innerHTML = '<p>удержаний: <span>' + (fee + fszn) + ' </span>&nbspруб. </p>';
            if (!diff) {
                d.querySelector('#error').innerHTML = '<p> разница: <span>' + diff + ' </span>&nbspруб. </p>';
            }

            d.querySelector('input[name="tariff"]').value = tariff;

        }
    };

    document.addEventListener("DOMContentLoaded", setListeners);

})();