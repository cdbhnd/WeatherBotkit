import { State } from '../StateBase';
import { Conversation } from '../ConversationBase';

export class AskTextState extends State {

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
    
            that.conversation.payload[that.property] = res.text;
    
            convo.gotoThread(that.conversation.getNext());
    
        }, {}, that.name);
    }
}