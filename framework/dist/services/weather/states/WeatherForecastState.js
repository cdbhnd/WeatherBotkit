"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateBase_1 = require("../../../framework/StateBase");
const gateway = require("../gateway/WeatherGateway");
const formatter = require("../formatters/WeatherTextFormatter");
class WeatherForecastState extends StateBase_1.State {
    constructor(conversation, name, propertyQuery, propertyResult) {
        super(conversation, name);
        this.propertyQuery = propertyQuery;
        this.propertyResult = propertyResult;
    }
    configure(convo, bot) {
        var that = this;
        convo.beforeThread(that.name, function (convo, next) {
            let period = formatter.formatPeriod(that.conversation.payload.forecastPeriodText);
            gateway.getForecast(that.conversation.payload[that.propertyQuery], period)
                .then(function (result) {
                that.conversation.payload[that.propertyResult] = result;
                next();
            })
                .catch(function (err) {
                that.conversation.payload.error = err;
                convo.gotoThread(that.conversation.getNext());
            });
        });
        var outputText = formatter.formatOutput(that.conversation.payload.outputFormat);
        convo.addMessage({
            text: outputText,
            action: function () {
                convo.gotoThread(that.conversation.getNext());
            }
        }, that.name);
    }
}
exports.WeatherForecastState = WeatherForecastState;
//# sourceMappingURL=WeatherForecastState.js.map