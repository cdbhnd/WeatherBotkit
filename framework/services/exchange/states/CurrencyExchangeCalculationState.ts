import { State } from '../../../framework/StateBase';
import { Conversation } from '../../../framework/ConversationBase';
import * as gateway from '../gateway/CurrencyExchangeGateway'

export class CurrencyExchangeCalculationState extends State {

    public configure(convo: any, bot: any) {

        var that = this;

        convo.beforeThread(that.name, function (convo, next) {

            gateway.convert(that.conversation.payload.fromCurrency, that.conversation.payload.toCurrency, that.conversation.payload.amount)
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
                text: '{{vars.payload.amount}} {{vars.payload.fromCurrency}} is {{vars.payload.result}} {{vars.payload.toCurrency}}',
                action: function () {
                    convo.gotoThread(that.conversation.getNext());
                }
            }, that.name);
    }
}