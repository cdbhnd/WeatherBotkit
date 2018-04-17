"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../../../framework/StateBase");
const gateway = require("../gateway/YoutubeGateway");
class YoutubeSearchState extends StateBase_1.State {
    constructor(conversation, name, propertyQuery, propertyResult) {
        super(conversation, name);
        this.propertyQuery = propertyQuery;
        this.propertyResult = propertyResult;
    }
    configure(convo, bot) {
        var that = this;
        convo.beforeThread(that.name, function (convo, next) {
            gateway.search(that.conversation.payload[that.propertyQuery])
                .then(function (result) {
                that.conversation.payload[that.propertyResult] = result;
            })
                .catch(function (err) {
                console.log(err);
                that.conversation.payload.error = 'Ooops';
            });
        });
        convo.addMessage({
            text: 'yep I found you some results here',
            action: function () {
                convo.gotoThread(that.conversation.getNext());
            }
        }, that.name);
    }
}
exports.YoutubeSearchState = YoutubeSearchState;
//# sourceMappingURL=YoutubeSearchState.js.map