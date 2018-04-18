"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../../../framework/StateBase");
class CreateNavigationState extends StateBase_1.State {
    constructor(conversation, name) {
        super(conversation, name);
    }
    configure(convo, bot) {
        var that = this;
        convo.beforeThread(that.name, function (convo, next) {
            that.conversation.payload.navigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${that.conversation.payload.fromLocationText}&destination=${that.conversation.payload.toLocationText}`;
            next();
        });
        convo.addMessage({
            text: '{{vars.payload.navigationUrl}}',
            action: function () {
                convo.gotoThread(that.conversation.getNext());
            }
        }, that.name);
    }
}
exports.CreateNavigationState = CreateNavigationState;
//# sourceMappingURL=CreateNavigationState.js.map