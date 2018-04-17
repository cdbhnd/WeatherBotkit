"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../StateBase");
class MessageState extends StateBase_1.State {
    constructor(conversation, name, text) {
        super(conversation, name);
        this.text = text;
    }
    configure(convo, bot) {
        convo.addMessage({
            text: this.text
        }, this.name);
    }
}
exports.MessageState = MessageState;
//# sourceMappingURL=MessageState.js.map