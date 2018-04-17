import { State } from '../StateBase';
import { Conversation } from '../ConversationBase';

export class AskFloatState extends State {

    private text: string;
    private property: string;

    constructor(conversation: Conversation, name: string, text: string, property: string) {

        super(conversation, name);

        this.text = text;
        this.property = property;
    }

    public configure(convo: any, bot: any) {

        var that = this;

        convo.addQuestion({ text: that.text }, function (res, convo) {

            let number = parseFloat(res.text);

            if (number === NaN) {
                that.conversation.payload.error = 'You have to enter number';
                convo.gotoThread(that.conversation.getNext());
                return;
            }

            that.conversation.payload[that.property] = number;

            convo.gotoThread(that.conversation.getNext());

        }, {}, that.name);
    }
}