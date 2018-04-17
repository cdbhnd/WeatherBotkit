import { AskTextState } from '../../framework/states/AskTextState'
import { Conversation } from '../../framework/ConversationBase';
import { MessageState } from '../../framework/states/MessageState'
import { AskFloatState } from '../../framework/states/AskFloatState'
import { YoutubeSearchState } from './states/YoutubeSearchState'

export class YoutubeSearchConversation extends Conversation {

    constructor(mode) {
        super();

        this.payload.searchQuery = null;
        this.payload.result = null;

        this.addState(new AskTextState(this, "ask-search-query", "What do you want to play on youtube?", "searchQuery"));
        this.addState(new YoutubeSearchState(this, 'show-result', 'searchQuery', 'result'));
        this.addState(new MessageState(this, "error", "Oooops {{vars.payload.error}}"));
    }

    public getNext() {

        if (this.payload.error) {
            return 'error';
        }

        if (!this.payload.searchQuery) {
            return 'ask-search-query';
        }

        if (!this.payload.result) {
            return 'show-result';
        }

        return 'done';
    }

    public init(bot: any, message: any) {

    }
}