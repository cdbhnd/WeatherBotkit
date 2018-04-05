var googleGeocoder = require('../services/googleGeocoder');
var weatherService = require('../services/weatherService');
var WeatherBot = require('../bots/WeatherBot');

module.exports = function (controller) {

    var hearsPatternsCityOnly = [
        'How is weather in (.*)',
        'how is weather in (.*)',
        'Weather in (.*)',
        'weather in (.*)',
        'Weather prognosis today in (.*)',
        'weather prognosis today in (.*)',
    ];

    var hearsPatternsTimeAndCity = [
        'How is weather (.*) in (.*)',
        'how is weather (.*) in (.*)',
        'Weather prognosis for (.*) in (.*)',
        'weather prognosis for (.*) in (.*)',
    ];

    var bot1 = new WeatherBot('PARAMETERLESS');
    var bot2 = new WeatherBot('CITY');
    var bot3 = new WeatherBot('TIMECITY');

    controller.hears(
        [new RegExp(/^(prognoza|vreme|weather)/i)],
        'message_received',
        bot1.createHandler());

    controller.hears(
        hearsPatternsCityOnly,
        'message_received',
        bot2.createHandler());

    controller.hears(
        hearsPatternsTimeAndCity,
        'message_received',
        bot3.createHandler());


};

