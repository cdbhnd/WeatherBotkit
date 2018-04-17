import * as request from 'request-promise';
import * as Q from 'q';
import * as utf8 from 'utf8';

export function findValuteByText(text) {

    if (new RegExp(/^(euro|euros|evro|european|eu|eur)/i).test(text)) {
        return 'EUR';
    }

    if (new RegExp(/^(dollar|dollars|american dollar|american dollars|usd)/i).test(text)) {
        return 'USD';
    }

    if (new RegExp(/^(dinar|serbian dinar|rsd|dinars|serbian dinars)/i).test(text)) {
        return 'RSD';
    }

    return 'EUR';
}

export function getExchangeRate(valuteFrom, valuteTo) {
    var opts = {
        method: 'GET',
        uri: 'http://data.fixer.io/api/latest?access_key=59e02437c3b97efe0caf81f6b01882e8&base=' + valuteFrom + '&symbols=' + valuteTo,
        json: true
    };
    return request(opts)
        .then(function (response) {
            return response.rates[valuteTo];
        });
}

export function convert(valuteFrom, valuteTo, amount) {

    return getExchangeRate(valuteFrom, valuteTo)
        .then(function (rate) {
            return amount * rate;
        })
}