"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../../../framework/StateBase");
const gateway = require("../gateway/CurrencyExchangeGateway");
class AskCurrencyState extends StateBase_1.State {
    constructor(conversation, name, text, property) {
        super(conversation, name);
        this.text = text;
        this.property = property;
    }
    configure(convo, bot) {
        var that = this;
        convo.addQuestion({ text: that.text }, function (res, convo) {
            let currency = gateway.findValuteByText(res.text);
            that.conversation.payload[that.property] = currency;
            convo.gotoThread(that.conversation.getNext());
        }, {}, that.name);
    }
}
exports.AskCurrencyState = AskCurrencyState;
//# sourceMappingURL=AskCurrencyState.js.map