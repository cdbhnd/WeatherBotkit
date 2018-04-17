"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConversationBase_1 = require("../../framework/ConversationBase");
const MessageState_1 = require("../../framework/states/MessageState");
const AskTextState_1 = require("../../framework/states/AskTextState");
const AskYesNoState_1 = require("../../framework/states/AskYesNoState");
const FindCityState_1 = require("../../framework/states/FindCityState");
const WeatherForecastState_1 = require("./states/WeatherForecastState");
exports.ForecastOutputFormat = {
    Default: 'default',
    Temperature: 'temperature',
    Humidity: 'humidity',
    Raining: 'raining'
};
class WeatherConversation extends ConversationBase_1.Conversation {
    constructor(confirmed, forecastFormat) {
        super();
        this.payload.confirmed = confirmed;
        this.payload.locationText = "";
        this.payload.foundLocation = null;
        this.payload.forecastPeriodText = "";
        this.payload.forecastPeriod = null; //today, tomorrow, nextweek
        this.payload.forecast = null;
        this.payload.error = null;
        this.payload.outputFormat = forecastFormat ? forecastFormat : exports.ForecastOutputFormat.Default;
        //confirm requested service
        this.addState(new AskYesNoState_1.AskYesNoState(this, "confirm-weather-service-is-needed", "Hey, looks like you need some weather prognosis. Is that true?", "confirmed"));
        //ask and find city/location for forecast
        this.addState(new AskTextState_1.AskTextState(this, "ask-location", "For what location?", "locationText"));
        this.addState(new FindCityState_1.FindCityState(this, "find-location", "locationText", "foundLocation"));
        //ask forecast period
        this.addState(new AskTextState_1.AskTextState(this, "ask-forecast-period", "For period?", "forecastPeriodText"));
        //error
        this.addState(new MessageState_1.MessageState(this, "error", "Oooops {{vars.payload.errorMessage}}"));
        //get forecast
        this.addState(new WeatherForecastState_1.WeatherForecastState(this, "forecast-report", "foundLocation", "forecast"));
    }
    getNext() {
        if (this.payload.errorMessage) {
            return 'error';
        }
        if (!this.payload.confirmed) {
            return 'confirm-weather-service-is-needed';
        }
        if (!this.payload.locationText) {
            return 'ask-location';
        }
        if (!this.payload.foundLocation) {
            return 'find-location';
        }
        if (!this.payload.forecastPeriodText) {
            return 'ask-forecast-period';
        }
        if (!this.payload.forecast) {
            return 'forecast-report';
        }
        return 'done';
    }
    init(bot, message) {
        //throw new Error("Method not implemented.");
    }
}
exports.WeatherConversation = WeatherConversation;
//# sourceMappingURL=WeatherConversation.js.map