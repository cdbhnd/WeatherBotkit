var AskTextState = require('./AskTextState.js');
var MessageState = require('./MessageState.js');
var FindConversionRateState = require('./FindConversionRateState.js');

module.exports = Exchange;

function Exchange(mode) {

    this.mode = mode;
    this.fromValute = null;
    this.toValute = null;
    this.amount = null;

    this.converstionRate = null;
    this.convertedAmount = null;

    this.error = null;

    this.states = [];

    this.states.push(new AskTextState(this, 'ask-from-valute', 'From Valute?', 'fromValute'));
    this.states.push(new AskTextState(this, 'ask-to-valute', 'To Valute?', 'toValue'));
    this.states.push(new AskTextState(this, 'ask-amount', 'Amount?', 'amount'));
    this.states.push(new MessageState(this, 'error', 'Sorry, we cannot find what you need'));
    this.states.push(new FindConversionRateState(this, 'rate-result'));
}

Exchange.prototype.getNext = function () {

    if (this.error) {
        return 'error';
    }

    if (!this.fromValute) {
        return 'ask-from-valute'
    }

    if (!this.toValute) {
        return 'ask-to-valute'
    }

    if (this.mode === 'CONVERT' && !this.amount) {
        return 'ask-amount'
    }

    if (this.mode === 'CONVERT') {
        return 'convert-result'
    }

    return 'rate-result'
}

Exchange.prototype.init = function (bot, message) {

    var that = this;

    if (that.mode === Exchange.MODES.PARAMETERLESS) {
        //do nothing    
    }

    if (that.mode === Exchange.MODES.RATE_MODE) {
        this.fromValute = message.match[1];
        this.toValute = message.match[2];
    }

    bot.startConversation(message, function (err, convo) {

        convo.setVar('exchange', that);

        that.states.forEach(state => {
            state.init(convo, bot);
        });

        convo.gotoThread(that.getNext());
    });
}

Exchange.MODES = {
    PARAMETERLESS: 'PARAMETERLESS',
    RATE_MODE: 'RATE_MODE',
    CONVERSION_CALCULATION:'CONVERSION_CALCULATION'
};
