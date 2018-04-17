"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../StateBase");
class AskFloatState extends StateBase_1.State {
    constructor(conversation, name, text, property) {
        super(conversation, name);
        this.text = text;
        this.property = property;
    }
    configure(convo, bot) {
        var that = this;
        convo.addQuestion({ text: that.text }, function (res, convo) {
            let number = parseFloat(res.text);
            if (number === NaN) {
                that.conversation.payload.error = 'You have to enter number';
                convo.gotoThread(that.conversation.getNext());
                return;
            }
            that.conversation.payload[that.property] = number;
            convo.gotoThread(that.conversation.getNext());
        }, {}, that.name);
    }
}
exports.AskFloatState = AskFloatState;
//# sourceMappingURL=AskFloatState.js.map