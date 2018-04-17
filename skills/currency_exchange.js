var ExchangeConversation = require('../framework/dist/services/exchange/ExchangeConversation.js').ExchangeConversation;
var ExchangeConversationMode = require('../framework/dist/services/exchange/ExchangeConversation.js').ExchangeConversationMode;

module.exports = function (controller) {

    var hearsPatternsRateMode = [
        'What is currency exchange rate (.*) to (.*)'
    ];

    var hearsPatternsConversionMode = [
        'How much is (.*) (.*) in (.*)'
    ];

    controller.hears(
        [new RegExp(/^(currency exchange|money exchange|exchange rate)/i)],
        'message_received',
        function (bot, message) {

            var exc = new ExchangeConversation();

            exc.start(bot, message);

        });

    controller.hears(
        hearsPatternsRateMode,
        'message_received',
        function (bot, message) {

            var exc = new ExchangeConversation(ExchangeConversationMode.Rate);
            exc.setFromCurrency(message.match[1]);
            exc.setToCurrency(message.match[2]);
            exc.start(bot, message);
        });

    controller.hears(
        hearsPatternsConversionMode,
        'message_received',
        function (bot, message) {

            var exc = new ExchangeConversation(ExchangeConversationMode.Calculation);
            exc.setAmount(message.match[1]);
            exc.setFromCurrency(message.match[2]);
            exc.setToCurrency(message.match[3]);
            exc.start(bot, message);
        });
};

