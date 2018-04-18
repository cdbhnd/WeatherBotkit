import { AskTextState } from '../../framework/states/AskTextState'
import { Conversation } from '../../framework/ConversationBase';
import { MessageState } from '../../framework/states/MessageState'
import { AskFloatState } from '../../framework/states/AskFloatState'
import { CreateNavigationState } from './states/CreateNavigationState'

export class NavigationConversation extends Conversation {

    constructor(mode) {
        super();

        this.payload.fromLocationText = null;
        this.payload.toLocationText = null;
        this.payload.navigationUrl = null;
        this.payload.result = null;
        this.payload.error = null;

        this.addState(new AskTextState(this, "ask-from", "Where do you want to start?", "fromLocationText"));
        this.addState(new AskTextState(this, "ask-to", "What is the destination?", "toLocationText"));
        this.addState(new CreateNavigationState(this, 'navigation-result'));
        this.addState(new MessageState(this, "error", "Oooops {{vars.payload.error}}"));
    }

    public getNext() {

        if (this.payload.error) {
            return 'error';
        }

        if (!this.payload.fromLocationText) {
            return 'ask-from';
        }

        if (!this.payload.toLocationText) {
            return 'ask-to';
        }

        if (!this.payload.navigationUrl) {
            return 'navigation-result';
        }

        return 'done';
    }

    public init(bot: any, message: any) {

    }
}