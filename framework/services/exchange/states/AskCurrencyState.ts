import { State } from '../../../framework/StateBase';
import { Conversation } from '../../../framework/ConversationBase';
import * as gateway from '../gateway/CurrencyExchangeGateway';

export class AskCurrencyState extends State {

    private text: string;
    private property: string;

    constructor(conversation: Conversation, name: string, text: string, property:string) {

        super(conversation, name);

        this.text = text;
        this.property = property;
    }

    public configure(convo: any, bot: any) {

        var that = this;

        convo.addQuestion({ text: that.text }, function (res, convo) {
    
            let currency = gateway.findValuteByText(res.text);

            that.conversation.payload[that.property] = currency;
    
            convo.gotoThread(that.conversation.getNext());
    
        }, {}, that.name);
    }
}