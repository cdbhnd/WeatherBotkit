import { Conversation } from '../../framework/ConversationBase';
import { MessageState } from '../../framework/states/MessageState'
import { AskTextState } from '../../framework/states/AskTextState'

export class ExchangeConversation extends Conversation {

    constructor(){
        super();

        this.addState(new MessageState(this,"show-message","Echo - {{vars.payload.echo}}"));
        this.addState(new AskTextState(this,"ask-message","Say something", "echo"));
    }
 
    public getNext() {

        if (this.payload.echo) {
            return 'show-message';
        }

        return 'ask-message';
    }
    public init(bot: any, message: any) {
       
    }
   
}