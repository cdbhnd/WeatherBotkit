import { State } from '../../../framework/StateBase';
import { Conversation } from '../../../framework/ConversationBase';
import * as gateway from '../gateway/WeatherGateway'
import * as formatter from '../formatters/WeatherTextFormatter'

export class WeatherForecastState extends State {

    private propertyQuery: string;
    private propertyResult: string;

    constructor(conversation: Conversation, name: string, propertyQuery: string, propertyResult: string) {

        super(conversation, name);

        this.propertyQuery = propertyQuery;
        this.propertyResult = propertyResult;
    }

    public configure(convo: any, bot: any) {

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
                })
        });

        var outputText = formatter.formatOutput(that.conversation.payload.outputFormat);

        convo.addMessage(
            {
                text: outputText,
                action: function () {
                    convo.gotoThread(that.conversation.getNext());
                }
            }, that.name);
    }
}