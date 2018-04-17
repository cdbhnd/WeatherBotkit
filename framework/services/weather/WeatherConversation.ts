import { Conversation } from '../../framework/ConversationBase';
import { MessageState } from '../../framework/states/MessageState'
import { AskTextState } from '../../framework/states/AskTextState'
import { AskYesNoState } from '../../framework/states/AskYesNoState'
import { FindCityState } from '../../framework/states/FindCityState'
import { WeatherForecastState } from './states/WeatherForecastState';

export const ForecastOutputFormat = {
    Default: 'default',
    Temperature: 'temperature',
    Humidity: 'humidity',
    Raining: 'raining'
}

export class WeatherConversation extends Conversation {

    constructor(confirmed, forecastFormat: string) {
        super();

        this.payload.confirmed = confirmed;
        this.payload.locationText = "";
        this.payload.foundLocation = null;
        this.payload.forecastPeriodText = "";
        this.payload.forecastPeriod = null; //today, tomorrow, nextweek
        this.payload.forecast = null;
        this.payload.error = null;
        this.payload.outputFormat = forecastFormat ? forecastFormat : ForecastOutputFormat.Default;

        //confirm requested service
        this.addState(new AskYesNoState(this, "confirm-weather-service-is-needed", "Hey, looks like you need some weather prognosis. Is that true?", "confirmed"))

        //ask and find city/location for forecast
        this.addState(new AskTextState(this, "ask-location", "For what location?", "locationText"));
        this.addState(new FindCityState(this, "find-location", "locationText", "foundLocation"));

        //ask forecast period
        this.addState(new AskTextState(this, "ask-forecast-period", "For period?", "forecastPeriodText"));

        //error
        this.addState(new MessageState(this, "error", "Oooops {{vars.payload.errorMessage}}"));

        //get forecast
        this.addState(new WeatherForecastState(this, "forecast-report", "foundLocation", "forecast"));

    }

    public getNext() {

        if (this.payload.errorMessage) {
            return 'error';
        }

        if (!this.payload.confirmed) {
            return 'confirm-weather-service-is-needed';
        }

        if (!this.payload.locationText) {
            return 'ask-location'
        }

        if (!this.payload.foundLocation) {
            return 'find-location';
        }

        if (!this.payload.forecastPeriodText) {
            return 'ask-forecast-period'
        }

        if (!this.payload.forecast) {
            return 'forecast-report'
        }

        return 'done';
    }
    public init(bot: any, message: any) {
        //throw new Error("Method not implemented.");
    }

}