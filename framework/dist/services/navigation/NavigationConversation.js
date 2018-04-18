"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AskTextState_1 = require("../../framework/states/AskTextState");
const ConversationBase_1 = require("../../framework/ConversationBase");
const MessageState_1 = require("../../framework/states/MessageState");
const CreateNavigationState_1 = require("./states/CreateNavigationState");
class NavigationConversation extends ConversationBase_1.Conversation {
    constructor(mode) {
        super();
        this.payload.fromLocationText = null;
        this.payload.toLocationText = null;
        this.payload.navigationUrl = null;
        this.payload.result = null;
        this.payload.error = null;
        this.addState(new AskTextState_1.AskTextState(this, "ask-from", "Where do you want to start?", "fromLocationText"));
        this.addState(new AskTextState_1.AskTextState(this, "ask-to", "What is the destination?", "toLocationText"));
        this.addState(new CreateNavigationState_1.CreateNavigationState(this, 'navigation-result'));
        this.addState(new MessageState_1.MessageState(this, "error", "Oooops {{vars.payload.error}}"));
    }
    getNext() {
        if (this.payload.error) {
            return 'error';
        }
        if (!this.payload.fromLocationText) {
            return 'ask-from';
        }
        if (!this.payload.toLocationText) {
            return 'ask-to';
        }
        if (!this.payload.navigationUrl) {
            return 'navigation-result';
        }
        return 'done';
    }
    init(bot, message) {
    }
}
exports.NavigationConversation = NavigationConversation;
//# sourceMappingURL=NavigationConversation.js.map