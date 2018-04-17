var WeatherConversation = require('../framework/dist/services/weather/WeatherConversation.js').WeatherConversation;
var ForecastOutputFormat = require('../framework/dist/services/weather/WeatherConversation.js').ForecastOutputFormat;

module.exports = function (controller) {

    var hearsPatternsLocationOnly = [
        'How is weather in (.*)',
        'how is weather in (.*)',
        'Weather in (.*)',
        'weather in (.*)',
        'Can you tell me what the weather is like in (.*) ?'
    ];

    var hearsPatternsTimeAndLocation = [
        'How is the weather (.*) in (.*)',
        'how is the weather (.*) in (.*)',
        'Weather prognosis for (.*) in (.*)',
        'weather prognosis for (.*) in (.*)',
    ];

    var hearsRaining = [
        'Do I have to count on rain?',
        'Will it rain?'
    ]

    controller.hears(
        [new RegExp(/^(prognoza|vreme|weather)/i)],
        'message_received',
        function (bot, message) {

            var weatherConversation = new WeatherConversation(false);
            weatherConversation.start(bot, message);
        });

    controller.hears(
        hearsPatternsLocationOnly,
        'message_received',
        function (bot, message) {

            var weatherConversation = new WeatherConversation(true);
            weatherConversation.payload.locationText = message.match[1];
            weatherConversation.payload.forecastPeriodText = 'today';

            weatherConversation.start(bot, message);
        });

    controller.hears(
        hearsPatternsTimeAndLocation,
        'message_received',
        function (bot, message) {

            var weatherConversation = new WeatherConversation(true);
            weatherConversation.payload.forecastPeriodText = message.match[1];
            weatherConversation.payload.locationText = message.match[2];

            weatherConversation.start(bot, message);
        });

    controller.hears(
        hearsRaining,
        'message_received',
        function (bot, message) {

            var weatherConversation = new WeatherConversation(true, ForecastOutputFormat.Raining);
            weatherConversation.start(bot, message);
        });
};

