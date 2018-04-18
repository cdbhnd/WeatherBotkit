import { State } from '../../../framework/StateBase';
import { Conversation } from '../../../framework/ConversationBase';
import * as gateway from '../gateway/YoutubeGateway'

export class YoutubeSearchState extends State {

    private propertyQuery: string;
    private propertyResult: string;

    constructor(conversation: Conversation, name: string, propertyQuery: string, propertyResult: string) {

        super(conversation, name);

        this.propertyQuery = propertyQuery;
        this.propertyResult = propertyResult;
    }

    public configure(convo: any, bot: any) {

        var that = this;

        convo.beforeThread(that.name, function (convo, next) {

            gateway.searchOne(that.conversation.payload[that.propertyQuery])
                .then(function(result){
                    that.conversation.payload[that.propertyResult] = result;
                    next();
                })
                .catch(function(err){
                    that.conversation.payload.error = 'Ooops'
                    convo.gotoThread(that.conversation.getNext());
                })
        });

        convo.addMessage(
            {
                text: '{{vars.payload.result.title}} {{vars.payload.result.url}}',
                action: function () {
                    convo.gotoThread(that.conversation.getNext());
                }
            }, that.name);
    }
}