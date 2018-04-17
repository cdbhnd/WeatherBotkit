"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../StateBase");
class AskYesNoState extends StateBase_1.State {
    constructor(conversation, name, text, property) {
        super(conversation, name);
        this.text = text;
        this.property = property;
    }
    configure(convo, bot) {
        var that = this;
        convo.addQuestion(that.text, [
            {
                pattern: bot.utterances.yes,
                callback: function (response, convo) {
                    that.conversation.payload[that.property] = true;
                    convo.gotoThread(that.conversation.getNext());
                }
            },
            {
                pattern: bot.utterances.no,
                callback: function (response, convo) {
                    that.conversation.payload[that.property] = false;
                    convo.gotoThread(that.conversation.getNext());
                }
            }
        ], {}, that.name);
    }
}
exports.AskYesNoState = AskYesNoState;
//# sourceMappingURL=AskYesNoState.js.map