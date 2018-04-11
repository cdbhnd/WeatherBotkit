
//Immediate reply:
//----------------
//U:What is currency exchange rate euro to dollar?
//A: 0.77

//U:How much is 100 euros in dollars?
//A: 110 dollars

//Conversation:
//-------------
//U: currency exchange
//A: Can you tell currency from?
//U: Euro
//A: Can you tell currency to?
//U: Dollar
//A: the exange rate is 0.12

module.exports = CurrencyExchangeBot;

var exchnageService = require('../services/currencyExchangeService');

function CurrencyExchangeBot(mode) {
    this.mode = mode;
}

var MODES = {
    PARAMETERLESS: 'PARAMETERLESS',
    RATE_MODE: 'RATE_MODE',
    CONVERSION_CALCULATION:'CONVERSION_CALCULATION'
};

CurrencyExchangeBot.prototype.createHandler = function () {

    var that = this;

    var handler = function (bot, message) {

        var fromCurrencyText = null;
        var toCurrencyText = null;
        var amountText = null;

        if (that.mode === MODES.PARAMETERLESS) {
            //do nothing    
        }

        if (that.mode === MODES.RATE_MODE) {
            fromCurrencyText = message.match[1];
            toCurrencyText = message.match[2];
        }

        if (that.mode === MODES.CONVERSION_CALCULATION) {
           
            amountText = message.match[1];
            fromCurrencyText = message.match[2];
            toCurrencyText = message.match[3];
        }

        bot.startConversation(message, function (err, convo) {

            convo.setVar('fromCurrencyText', fromCurrencyText);
            convo.setVar('toCurrencyText', toCurrencyText);
            convo.setVar('amountText', amountText);

            addAskCurrencyFromThread(convo, bot);
            addAskCurrencyToThread(convo, bot);
            addAskAmountThread(convo, bot);

            addConversionRateResultThread(convo, bot);
            addConversionAmountResultThread(convo, bot);
           
            var thread = getNextThread(convo);

            convo.gotoThread(thread);
        });
    };

    return handler;

    function addAskCurrencyFromThread(convo, bot){

        convo.addQuestion({ text: 'From Currency?' }, function (res, convo) {
    
            convo.setVar('fromCurrencyText', res.text);
    
            var nextThread = getNextThread(convo);
    
            convo.gotoThread(nextThread);
    
        }, {}, 'ask-currency-from');
    }
    
    function addAskCurrencyToThread(convo, bot){
    
        convo.addQuestion({ text: 'To Currency?' }, function (res, convo) {
    
            convo.setVar('toCurrencyText', res.text);
    
            var nextThread = getNextThread(convo);
    
            convo.gotoThread(nextThread);
    
        }, {}, 'ask-currency-to');
    }
    
    function addAskAmountThread(convo, bot){
    
        convo.addQuestion({ text: 'Amount?' }, function (res, convo) {
    
            convo.setVar('amountText', res.text);
    
            var nextThread = getNextThread(convo);
    
            convo.gotoThread(nextThread);
    
        }, {}, 'ask-amount');
    }
    
    function addConversionRateResultThread(convo, bot){
        
        convo.beforeThread('conversion-rate-result-thread', function (convo, next) {
    
            var valuteFrom = exchnageService.findValuteByText(convo.vars.fromCurrencyText);
            var valuteTo = exchnageService.findValuteByText(convo.vars.toCurrencyText);
    
            exchnageService.getExchangeRate(valuteFrom,valuteTo)
                .then(function (result) {
                    convo.setVar('result', result);
                    next();
                })
                .catch(function (err) {
                    //next(err);
                    convo.gotoThread('exchange-rate-not-available');
                })
        });
    
        convo.addMessage(
            {
                text: 'Exchange rate for {{vars.fromCurrencyText}} to {{vars.toCurrencyText}} is {{vars.result}}'
            }, 'conversion-rate-result-thread')
    
        convo.addMessage(
            {
                text: 'Exchnage rate not available ATM, sorry.'
            }, 'exchange-rate-not-available')
    }

    function addConversionAmountResultThread(convo, bot){
        
        convo.beforeThread('conversion-amount-result-thread', function (convo, next) {
    
            var valuteFrom = exchnageService.findValuteByText(convo.vars.fromCurrencyText);
            var valuteTo = exchnageService.findValuteByText(convo.vars.toCurrencyText);
            var amount = parseFloat(convo.vars.amountText);
    
            exchnageService.convert(valuteFrom,valuteTo, amount)
                .then(function (result) {
                    convo.setVar('result', result);
                    next();
                })
                .catch(function (err) {
                    //next(err);
                    convo.gotoThread('exchange-rate-not-available');
                })
        });
    
        convo.addMessage(
            {
                text: '{{vars.amountText}} {{vars.fromCurrencyText}} in {{vars.toCurrencyText}} is {{vars.result}}'
            }, 'conversion-amount-result-thread')

    }
    
    function getNextThread(convo){
    
        if(that.mode === MODES.CONVERSION_CALCULATION){
    
            if(convo.vars.fromCurrencyText && convo.vars.toCurrencyText && convo.vars.amountText){
                return 'conversion-amount-result-thread'
            }
    
            if(!convo.vars.fromCurrencyText){
                return 'ask-currency-from'
            }
    
            if(!convo.vars.toCurrencyText){
                return 'ask-currency-from'
            }
    
            if(!convo.vars.amountText){
                return 'ask-amount'
            }
        }
    
        if(convo.vars.fromCurrencyText && convo.vars.toCurrencyText){
            return 'conversion-rate-result-thread'
        }
    
        if(!convo.vars.fromCurrencyText){
            return 'ask-currency-from'
        }
        
        return 'ask-currency-to'
    }
}

