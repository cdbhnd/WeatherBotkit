var exchnageService = require('../services/currencyExchangeService.js');

module.exports = FindConverstionRateState;

function FindConverstionRateState(exchange, name) {
    this.exchange = exchange;
    this.name = name;
}

FindConverstionRateState.prototype.init = function (convo, bot) {

    var that = this;

    convo.beforeThread(that.name, function (convo, next) {
    
        var valuteFrom = exchnageService.findValuteByText(that.exchange.fromValute);
        var valuteTo = exchnageService.findValuteByText(that.exchange.toValute);

        exchnageService.getExchangeRate(valuteFrom, valuteTo)
            .then(function (result) {
                that.exchange.conversionRate = result;
                next();
            })
            .catch(function (err) {
                that.exchange.error = err;
                convo.gotoThread(that.exchange.getNext());
            })
    });

    convo.addMessage(
        {
            text: 'Exchange rate for {{vars.exchange.fromValute}} to {{vars.exchange.toValute}} is {{vars.exchange.conversionRate}}'
        }, that.name)
}