"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConversationBase_1 = require("../../framework/ConversationBase");
const MessageState_1 = require("../../framework/states/MessageState");
const AskFloatState_1 = require("../../framework/states/AskFloatState");
const AskCurrencyState_1 = require("./states/AskCurrencyState");
const CurrencyExchangeCalculationState_1 = require("./states/CurrencyExchangeCalculationState");
const CurrencyExchangeRateState_1 = require("./states/CurrencyExchangeRateState");
const gateway = require("./gateway/CurrencyExchangeGateway");
exports.ExchangeConversationMode = {
    Rate: 'rate',
    Calculation: 'calculation'
};
class ExchangeConversation extends ConversationBase_1.Conversation {
    constructor(mode) {
        super();
        this.payload.fromCurrency = null;
        this.payload.toCurrency = null;
        this.payload.amount = null;
        this.payload.mode = mode ? mode : exports.ExchangeConversationMode.Rate;
        this.payload.result = null;
        this.addState(new AskCurrencyState_1.AskCurrencyState(this, "ask-currency-from", "From what currency?", "fromCurrency"));
        this.addState(new AskCurrencyState_1.AskCurrencyState(this, "ask-currency-to", "To what currency?", "toCurrency"));
        this.addState(new AskFloatState_1.AskFloatState(this, "ask-amount", "Amount?", "amount"));
        this.addState(new CurrencyExchangeRateState_1.CurrencyExchangeRateState(this, "result-rate"));
        this.addState(new CurrencyExchangeCalculationState_1.CurrencyExchangeCalculationState(this, "result-calculation"));
        //error
        this.addState(new MessageState_1.MessageState(this, "error", "Oooops {{vars.payload.error}}"));
    }
    getNext() {
        if (this.payload.error) {
            return 'error';
        }
        if (!this.payload.fromCurrency) {
            return 'ask-currency-from';
        }
        if (!this.payload.toCurrency) {
            return 'ask-currency-to';
        }
        if (this.payload.mode === exports.ExchangeConversationMode.Rate && !this.payload.result) {
            return 'result-rate';
        }
        if (this.payload.mode === exports.ExchangeConversationMode) {
            if (!this.payload.amount) {
                return 'ask-amount';
            }
            if (!this.payload.result) {
                return 'result-calculation';
            }
        }
        return 'done';
    }
    init(bot, message) {
    }
    setFromCurrency(text) {
        this.payload.fromCurrency = gateway.findValuteByText(text);
    }
    setToCurrency(text) {
        this.payload.toCurrency = gateway.findValuteByText(text);
    }
    setAmount(text) {
        var amount = parseFloat(text);
        if (amount !== NaN) {
            this.payload.amount = amount;
        }
    }
}
exports.ExchangeConversation = ExchangeConversation;
//# sourceMappingURL=ExchangeConversation.js.map