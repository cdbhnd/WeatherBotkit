import { Conversation } from '../../framework/ConversationBase';
import { MessageState } from '../../framework/states/MessageState'
import { AskFloatState } from '../../framework/states/AskFloatState'
import { AskCurrencyState } from './states/AskCurrencyState'
import { CurrencyExchangeCalculationState } from './states/CurrencyExchangeCalculationState'
import { CurrencyExchangeRateState } from './states/CurrencyExchangeRateState'
import * as gateway from './gateway/CurrencyExchangeGateway'

export const ExchangeConversationMode = {
    Rate: 'rate',
    Calculation: 'calculation'
}

export class ExchangeConversation extends Conversation {

    constructor(mode) {
        super();

        this.payload.fromCurrency = null;
        this.payload.toCurrency = null;
        this.payload.amount = null;
        this.payload.mode = mode ? mode : ExchangeConversationMode.Rate;
        this.payload.result = null;

        this.addState(new AskCurrencyState(this, "ask-currency-from", "From what currency?", "fromCurrency"));
        this.addState(new AskCurrencyState(this, "ask-currency-to", "To what currency?", "toCurrency"));
        this.addState(new AskFloatState(this, "ask-amount", "Amount?", "amount"));
        this.addState(new CurrencyExchangeRateState(this, "result-rate"));
        this.addState(new CurrencyExchangeCalculationState(this, "result-calculation"));
        //error
        this.addState(new MessageState(this, "error", "Oooops {{vars.payload.error}}"));
    }

    public getNext() {

        if (this.payload.error) {
            return 'error';
        }

        if (!this.payload.fromCurrency) {
            return 'ask-currency-from';
        }

        if (!this.payload.toCurrency) {
            return 'ask-currency-to';
        }

        if (this.payload.mode === ExchangeConversationMode.Rate && !this.payload.result) {
            return 'result-rate'
        }

        if (this.payload.mode === ExchangeConversationMode) {
            if (!this.payload.amount) {
                return 'ask-amount'
            }

            if (!this.payload.result) {
                return 'result-calculation'
            }
        }

        return 'done';
    }

    public init(bot: any, message: any) {

    }

    public setFromCurrency(text: string) {
        this.payload.fromCurrency = gateway.findValuteByText(text);
    }

    public setToCurrency(text: string) {
        this.payload.toCurrency = gateway.findValuteByText(text);
    }

    public setAmount(text: string) {
        var amount = parseFloat(text);
        if (amount !== NaN) {
            this.payload.amount = amount;
        }
    }
}