import { State } from '../StateBase';
import { Conversation } from '../ConversationBase';

export class AskYesNoState extends State {

    private text: string;
    private property: string;

    constructor(conversation: Conversation, name: string, text: string, property:string) {

        super(conversation, name);

        this.text = text;
        this.property = property;
    }

    public configure(convo: any, bot: any) {

        var that = this;

        convo.addQuestion(
            that.text,
            [
                {
                    pattern: bot.utterances.yes,
                    callback: function (response, convo) {
                        that.conversation.payload[that.property] = true;
                        convo.gotoThread(that.conversation.getNext());
                    }
                },
                {
                    pattern: bot.utterances.no,
                    callback: function (response, convo) {
                        that.conversation.payload[that.property] = false;
                        convo.gotoThread(that.conversation.getNext());
                    }
                }
            ],
            {},
            that.name
        
        );
    }
}