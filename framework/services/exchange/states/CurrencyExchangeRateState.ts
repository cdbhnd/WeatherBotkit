import { State } from '../../../framework/StateBase';
import { Conversation } from '../../../framework/ConversationBase';
import * as gateway from '../gateway/CurrencyExchangeGateway'

export class CurrencyExchangeRateState extends State {

    public configure(convo: any, bot: any) {

        var that = this;

        convo.beforeThread(that.name, function (convo, next) {

            gateway.getExchangeRate(that.conversation.payload.fromCurrency, that.conversation.payload.toCurrency)
                .then(function (result) {
                    that.conversation.payload.result = result;
                    next();
                })
                .catch(function (err) {
                    that.conversation.payload.error = err;
                })
        });

        convo.addMessage(
            {
                text: 'Exchange rate {{vars.payload.fromCurrency}} to {{vars.payload.toCurrency}} is {{vars.payload.result}}',
                action: function () {
                    convo.gotoThread(that.conversation.getNext());
                }
            }, that.name);
    }
}