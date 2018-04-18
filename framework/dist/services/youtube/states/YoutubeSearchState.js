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
            gateway.searchOne(that.conversation.payload[that.propertyQuery])
                .then(function (result) {
                that.conversation.payload[that.propertyResult] = result;
                next();
            })
                .catch(function (err) {
                that.conversation.payload.error = 'Ooops';
                convo.gotoThread(that.conversation.getNext());
            });
        });
        convo.addMessage({
            text: 'Here you go {{vars.payload.result.title}} {{vars.payload.result.url}}',
            action: function () {
                convo.gotoThread(that.conversation.getNext());
            },
            files: [
                {
                    url: function () {
                        return that.conversation.payload.result.url;
                    },
                    image: false
                }
            ]
        }, that.name);
    }
}
exports.YoutubeSearchState = YoutubeSearchState;
//# sourceMappingURL=YoutubeSearchState.js.map