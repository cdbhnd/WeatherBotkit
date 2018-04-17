"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
function findValuteByText(text) {
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
exports.findValuteByText = findValuteByText;
function getExchangeRate(valuteFrom, valuteTo) {
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
exports.getExchangeRate = getExchangeRate;
function convert(valuteFrom, valuteTo, amount) {
    return getExchangeRate(valuteFrom, valuteTo)
        .then(function (rate) {
        return amount * rate;
    });
}
exports.convert = convert;
//# sourceMappingURL=CurrencyExchangeGateway.js.map