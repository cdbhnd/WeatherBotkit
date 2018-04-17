import { State } from '../StateBase';
import { Conversation } from '../ConversationBase';
import { geocode } from '../../gateways/GoogleGeocoder';

export class FindCityState extends State {

    private propertyQuery: string;
    private propertyDestination: string;

    constructor(conversation: Conversation, name: string, propertyQuery: string, propertyDestination:string) {

        super(conversation, name);

        this.propertyQuery = propertyQuery;
        this.propertyDestination = propertyDestination;
    }

    public configure(convo: any, bot: any) {

        var that = this;

        convo.beforeThread(that.name, function (convo, next) {
            
            geocode(that.conversation.payload[that.propertyQuery])
                .then(function (result) {
                    that.conversation.payload[that.propertyDestination] = result;
                })
                .catch(function (error) {
                    that.conversation.payload.error = error;
                })
                .finally(function(){
                    convo.gotoThread(that.conversation.getNext());
                })
        });

    }
}