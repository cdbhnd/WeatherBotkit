var CurrencyExchangeBot = require('../bots/CurrencyExchangeBot');

module.exports = function (controller) {

    var hearsPatternsRateMode = [
        'What is currency exchange rate (.*) to (.*)'
    ];

    var hearsPatternsConversionMode = [
        'How much is (.*) (.*) in (.*)'
    ];

    var bot1 = new CurrencyExchangeBot('PARAMETERLESS');
    var bot2 = new CurrencyExchangeBot('RATE_MODE');
    var bot3 = new CurrencyExchangeBot('CONVERSION_CALCULATION');
    

    controller.hears(
        [new RegExp(/^(currency exchange|money exchange|exchange rate)/i)],
        'message_received',
        bot1.createHandler());

    controller.hears(
        hearsPatternsRateMode,
        'message_received',
        bot2.createHandler());

        controller.hears(
            hearsPatternsConversionMode,
            'message_received',
            bot3.createHandler());



};

