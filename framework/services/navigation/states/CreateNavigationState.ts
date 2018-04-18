import { State } from '../../../framework/StateBase';
import { Conversation } from '../../../framework/ConversationBase';

export class CreateNavigationState extends State {

    constructor(conversation: Conversation, name: string) {
        super(conversation, name);
    }

    public configure(convo: any, bot: any) {

        var that = this;

        convo.beforeThread(that.name, function (convo, next) {

            that.conversation.payload.navigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${that.conversation.payload.fromLocationText}&destination=${that.conversation.payload.toLocationText}`;

            next();
        });

        convo.addMessage(
            {
                text: '{{vars.payload.navigationUrl}}',
                action: function () {
                    convo.gotoThread(that.conversation.getNext());
                }
            }, that.name);
    }
}