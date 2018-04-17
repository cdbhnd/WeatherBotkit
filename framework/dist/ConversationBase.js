"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conversation {
    constructor() {
        this.setError = (error) => {
            this.error = error;
        };
        this.addState = (state) => {
            this.states.push(state);
        };
        this.start = (bot, message) => {
            var that = this;
            that.init(bot, message);
            bot.startConversation(message, function (err, convo) {
                convo.setVar('payload', that.payload);
                that.states.forEach(state => {
                    state.configure(convo, bot);
                });
                convo.gotoThread(that.getNext());
            });
        };
        this.states = new Array();
        this.payload = {};
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=ConversationBase.js.map