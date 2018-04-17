var ExchangeConversation = require('../framework/dist/services/exchange/ExchangeConversation.js').ExchangeConversation; 

module.exports = function(controller) {

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
};

