import { Conversation } from "./ConversationBase"

export abstract class State {
    
    public conversation: Conversation
    public name: string;

    constructor(conversation:Conversation, name:string){
        this.conversation = conversation;
        this.name = name;
    }

    public abstract configure(convo, bot);
}

