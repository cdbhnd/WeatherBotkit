module.exports = MessageState;

function MessageState(exchange, name, text) {
    this.exchange = exchange;
    this.name = name;
    this.text = text;
}

MessageState.prototype.init = function (convo, bot) {

    var that = this;

    convo.addMessage(
        {
            text: that.text
        }, that.name)
}