"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../../../framework/StateBase");
const gateway = require("../gateway/CurrencyExchangeGateway");
class CurrencyExchangeCalculationState extends StateBase_1.State {
    configure(convo, bot) {
        var that = this;
        convo.beforeThread(that.name, function (convo, next) {
            gateway.convert(that.conversation.payload.fromCurrency, that.conversation.payload.toCurrency, that.conversation.payload.amount)
                .then(function (result) {
                that.conversation.payload.result = result;
                next();
            })
                .catch(function (err) {
                that.conversation.payload.error = err;
            });
        });
        convo.addMessage({
            text: '{{vars.payload.amount}} {{vars.payload.fromCurrency}} is {{vars.payload.result}} {{vars.payload.toCurrency}}',
            action: function () {
                convo.gotoThread(that.conversation.getNext());
            }
        }, that.name);
    }
}
exports.CurrencyExchangeCalculationState = CurrencyExchangeCalculationState;
//# sourceMappingURL=CurrencyExchangeCalculationState.js.map