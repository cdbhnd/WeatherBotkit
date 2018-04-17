module.exports = AskTextState;

function AskTextState(exchange, name, text, property) {
    this.exchange = exchange;
    this.name = name;
    this.text = text;
    this.property = property;
}

AskTextState.prototype.init = function (convo, bot) {

    var that = this;

    convo.addQuestion({ text: that.text }, function (res, convo) {

        that.exchange[that.property] = res.text;

        convo.gotoThread(that.exchange.getNext());

    }, {}, that.name);
}