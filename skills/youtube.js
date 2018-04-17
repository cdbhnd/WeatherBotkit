var YoutubeSearchConversation = require('../framework/dist/services/youtube/YoutubeSearchConversation.js').YoutubeSearchConversation;

module.exports = function (controller) {

    controller.hears(
        [new RegExp(/^(youtube|you tube)/i)],
        'message_received',
        function (bot, message) {

            var exc = new YoutubeSearchConversation();

            exc.start(bot, message);

        });
};

