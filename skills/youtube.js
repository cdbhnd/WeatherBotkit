var YoutubeSearchConversation = require('../framework/dist/services/youtube/YoutubeSearchConversation.js').YoutubeSearchConversation;

module.exports = function (controller) {

    var hearPatterns = [
        'Play me (.*) on youtube',
        'I want to listen (.*) on youtube',
        'youtube (.*)'
    ];

    controller.hears(
        [new RegExp(/^(youtube|you tube)/i)],
        'message_received',
        function (bot, message) {

            var exc = new YoutubeSearchConversation();

            exc.start(bot, message);

        });

        controller.hears(
            hearPatterns,
            'message_received',
            function (bot, message) {
    
                var exc = new YoutubeSearchConversation();
                exc.payload.searchQuery = message.match[1];
                exc.start(bot, message);
    
            });
};

