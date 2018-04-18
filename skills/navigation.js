var NavigationConversation = require('../framework/dist/services/navigation/NavigationConversation.js').NavigationConversation;

module.exports = function (controller) {

    var hearPatterns = [
        'How to go from (.*) to (.*)',
        'Give me navigation from (.*) to (.*)',
        'Navigate me from (.*) to (.*)'
    ];

    controller.hears(
        [new RegExp(/^(navigation)/i)],
        'message_received',
        function (bot, message) {

            var exc = new NavigationConversation();

            exc.start(bot, message);

        });

        controller.hears(
            hearPatterns,
            'message_received',
            function (bot, message) {
    
                var exc = new NavigationConversation();
                exc.payload.fromLocationText = message.match[1];
                exc.payload.toLocationText = message.match[2];
                exc.start(bot, message);
    
            });
};

