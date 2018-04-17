"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../../../framework/StateBase");
const gateway = require("../gateway/CurrencyExchangeGateway");
class CurrencyExchangeRateState extends StateBase_1.State {
    configure(convo, bot) {
        var that = this;
        convo.beforeThread(that.name, function (convo, next) {
            gateway.getExchangeRate(that.conversation.payload.fromCurrency, that.conversation.payload.toCurrency)
                .then(function (result) {
                that.conversation.payload.result = result;
                next();
            })
                .catch(function (err) {
                that.conversation.payload.error = err;
            });
        });
        convo.addMessage({
            text: 'Exchange rate {{vars.payload.fromCurrency}} to {{vars.payload.toCurrency}} is {{vars.payload.result}}',
            action: function () {
                convo.gotoThread(that.conversation.getNext());
            }
        }, that.name);
    }
}
exports.CurrencyExchangeRateState = CurrencyExchangeRateState;
//# sourceMappingURL=CurrencyExchangeRateState.js.map