"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConversationBase_1 = require("../../framework/ConversationBase");
const MessageState_1 = require("../../framework/states/MessageState");
const AskTextState_1 = require("../../framework/states/AskTextState");
class ExchangeConversation extends ConversationBase_1.Conversation {
    constructor() {
        super();
        this.addState(new MessageState_1.MessageState(this, "show-message", "Echo - {{vars.payload.echo}}"));
        this.addState(new AskTextState_1.AskTextState(this, "ask-message", "Say something", "echo"));
    }
    getNext() {
        if (this.payload.echo) {
            return 'show-message';
        }
        return 'ask-message';
    }
    init(bot, message) {
    }
}
exports.ExchangeConversation = ExchangeConversation;
//# sourceMappingURL=ExchangeConversation.js.map