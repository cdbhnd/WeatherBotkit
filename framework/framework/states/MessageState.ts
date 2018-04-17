import { State } from '../StateBase';
import { Conversation } from '../ConversationBase';

export class MessageState extends State {

    private text: string;

    constructor(conversation: Conversation, name: string, text: string) {

        super(conversation, name);

        this.text = text;
    }

    public configure(convo: any, bot: any) {

        convo.addMessage(
            {
                text: this.text
            }, this.name);
    }
}