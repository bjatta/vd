;(() => {
    let __ = console.log;

    let today = (now=true)=> {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        if (!now){
            --yyyy;
        }

        return yyyy+'-'+mm+'-'+dd;
    };

    let d = document.querySelector('#vd-main-section');

    let setListeners = () => {
        d.querySelector('input[name="ends_at"]').value=today();
        d.querySelector('input[name="starts_at"]').value=today(false);
        calc();
        [
            'input[name="ends_at"]',
            'input[name="starts_at"]',
            'input[name="days"]',
            'input[name="contract_days"]'
        ].forEach(cssSelector=>{
            "use strict";
            d.querySelector(cssSelector).addEventListener('change',calc);
        });
    };

    let checkDate = (htmlNodeWithDate, initialValue) => {
        let date1;
        if (date1 = Date.parse(htmlNodeWithDate.value)) return date1;
        else {
            htmlNodeWithDate.value = initialValue;
            return Date.parse(initialValue);
        }
    };

    let calc = () => {
        let daysDone;
        daysDone = (checkDate(d.querySelector('input[name="ends_at"]'), today())
            - checkDate(d.querySelector('input[name="starts_at"]'), "2015-07-02"))
            / (60 * 60 * 24 * 1000);
        let monthesDone;
        monthesDone = Math.round(daysDone / 29.7);
        d.querySelector('div').innerHTML = '<p>' + daysDone + ' дн. '
            + monthesDone + ' мес.</p>'
            + 'Количество дней трудового отпуска: <span>'
            + (Math.round(d.querySelector('input[name="days"]').value / 12 * monthesDone)
                - parseInt(d.querySelector('input[name="contract_days"]').value) + '&nbsp;</span>');
    };

    document.addEventListener("DOMContentLoaded", setListeners);

})();