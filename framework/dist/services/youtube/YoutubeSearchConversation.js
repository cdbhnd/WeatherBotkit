"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AskTextState_1 = require("../../framework/states/AskTextState");
const ConversationBase_1 = require("../../framework/ConversationBase");
const MessageState_1 = require("../../framework/states/MessageState");
const YoutubeSearchState_1 = require("./states/YoutubeSearchState");
class YoutubeSearchConversation extends ConversationBase_1.Conversation {
    constructor(mode) {
        super();
        this.payload.searchQuery = null;
        this.payload.result = null;
        this.addState(new AskTextState_1.AskTextState(this, "ask-search-query", "What do you want to play on youtube?", "searchQuery"));
        this.addState(new YoutubeSearchState_1.YoutubeSearchState(this, 'show-result', 'searchQuery', 'result'));
        this.addState(new MessageState_1.MessageState(this, "error", "Oooops {{vars.payload.error}}"));
    }
    getNext() {
        if (this.payload.error) {
            return 'error';
        }
        if (!this.payload.searchQuery) {
            return 'ask-search-query';
        }
        if (!this.payload.result) {
            return 'show-result';
        }
        return 'done';
    }
    init(bot, message) {
    }
}
exports.YoutubeSearchConversation = YoutubeSearchConversation;
//# sourceMappingURL=YoutubeSearchConversation.js.map