import { State } from "./StateBase"

export abstract class Conversation
{
    protected error: any;

    public payload: any;
    public states: Array<State>;

    constructor(){
        this.states = new Array<State>();
        this.payload = {};
    }

    public setError = (error) => {
        this.error = error;
    }

    public addState = (state: State) => {
        this.states.push(state);
    }

    public start = (bot, message) =>{

        var that = this;

        that.init(bot, message);

        bot.startConversation(message, function (err, convo) {

            convo.setVar('payload', that.payload);
    
            that.states.forEach(state => {
                state.configure(convo, bot);
            });
    
            convo.gotoThread(that.getNext());
        });
    }

    public abstract getNext(): any;
    public abstract init(bot, message): any;

}