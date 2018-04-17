"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../StateBase");
class AskTextState extends StateBase_1.State {
    constructor(conversation, name, text, property) {
        super(conversation, name);
        this.text = text;
        this.property = property;
    }
    configure(convo, bot) {
        var that = this;
        convo.addQuestion({ text: that.text }, function (res, convo) {
            that.conversation.payload[that.property] = res.text;
            convo.gotoThread(that.conversation.getNext());
        }, {}, that.name);
    }
}
exports.AskTextState = AskTextState;
//# sourceMappingURL=AskTextState.js.map