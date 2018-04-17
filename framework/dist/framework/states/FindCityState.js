"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../StateBase");
const GoogleGeocoder_1 = require("../../gateways/GoogleGeocoder");
class FindCityState extends StateBase_1.State {
    constructor(conversation, name, propertyQuery, propertyDestination) {
        super(conversation, name);
        this.propertyQuery = propertyQuery;
        this.propertyDestination = propertyDestination;
    }
    configure(convo, bot) {
        var that = this;
        convo.beforeThread(that.name, function (convo, next) {
            GoogleGeocoder_1.geocode(that.conversation.payload[that.propertyQuery])
                .then(function (result) {
                that.conversation.payload[that.propertyDestination] = result;
            })
                .catch(function (error) {
                that.conversation.payload.error = error;
            })
                .finally(function () {
                convo.gotoThread(that.conversation.getNext());
            });
        });
    }
}
exports.FindCityState = FindCityState;
//# sourceMappingURL=FindCityState.js.map