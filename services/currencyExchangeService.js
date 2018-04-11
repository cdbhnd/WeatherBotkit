var request = require('request-promise');
var $q = require('q');

module.exports = {
    findValuteByText: findValuteByText,
    getExchangeRate:getExchangeRate,
    convert:convert
}

function findValuteByText(text) {

    if(text.toUpperCase() === 'EURO'){
        return 'EUR';
    }    

    if(text.toUpperCase() === 'DOLLAR'){
        return 'USD';
    }  

    return 'EUR'
}

function getExchangeRate(valuteFrom, valuteTo){
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

function convert(valuteFrom, valuteTo, amount){

    return getExchangeRate(valuteFrom, valuteTo)
        .then(function(rate){
            return amount * rate;
        })
    // var opts = {
    //     method: 'GET',
    //     uri: 'http://data.fixer.io/api/convert?access_key=59e02437c3b97efe0caf81f6b01882e8&from=' + valuteFrom + '&to=' + valuteTo+'&amount'+amount,
    //     json: true
    // };
    // return request(opts)
    //     .then(function (response) {
    //         console.log(response);
    //         return response.result
    //     });
//}
}