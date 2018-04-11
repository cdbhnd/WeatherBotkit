module.exports = WeatherBot;

var googleGeocoder = require('../services/googleGeocoder');
var weatherService = require('../services/weatherService');

function WeatherBot(mode) {
    this.mode = mode;
}

var MODES = {
    PARAMETERLESS: 'PARAMETERLESS',
    CITY: 'CITY',
    TIME: 'TIME',
    CITYTIME: 'CITYTIME',
    TIMECITY: 'TIMECITY'
};

WeatherBot.prototype.createHandler = function () {

    var that = this;

    var handler = function (bot, message) {

        var cityText = null;
        var timeText = null;

        if (that.mode === MODES.PARAMETERLESS) {
            //do nothing    
        }

        if (that.mode === MODES.CITY) {
            cityText = message.match[1];
        }

        if (that.mode === MODES.TIME) {
            timeText = message.match[1];
        }

        if (that.mode === MODES.CITYTIME) {
            cityText = message.match[1];
            timeText = message.match[2];
        }

        if (that.mode === MODES.TIMECITY) {
            cityText = message.match[2];
            timeText = message.match[1];
        }

        bot.startConversation(message, function (err, convo) {

            convo.setVar('cityText', cityText);
            convo.setVar('timeText', timeText);

            addVerifyThread(convo, bot);

            addAskCityThread(convo, bot);
            addFindCityThread(convo, bot);

            addAskTimeThread(convo, bot);

            addUnknownCityThread(convo, bot);
            addSummaryThread(convo, bot);
            addForecastThread(convo, bot);

            var thread = getInitialThread(convo);

            convo.gotoThread(thread);
        });
    };

    return handler;
}

function addVerifyThread(convo, bot) {
    convo.addQuestion(
        "Hey, looks like you need some weather prognosis. Is that true?",
        [
            {
                pattern: bot.utterances.yes,
                callback: function (response, convo) {
                    convo.gotoThread('ask_city');
                }
            },
            {
                pattern: bot.utterances.no,
                callback: function (response, convo) {
                    convo.next();
                }
            }
        ],
        {},
        'verify'
    );
}

function addAskCityThread(convo) {
    convo.addQuestion({ text: 'For what city?' }, function (res, convo) {

        convo.setVar('cityText', res.text);

        convo.gotoThread('find_city');

    }, {}, 'ask_city');
}

function addFindCityThread(convo) {

    convo.beforeThread('find_city', function (convo, next) {
        googleGeocoder.geocode(convo.vars.cityText)
            .then(function (result) {
                convo.setVar('city', result);

                var nextThread = getNextThread(convo);
                convo.gotoThread(nextThread);
            })
            .catch(function (error) {
                convo.gotoThread('unknown_city');
            });
    });

}

function addUnknownCityThread(convo) {
    convo.addMessage({ text: 'Sorry, we dont know city {{vars.cityText}}.' }, 'unknown_city');
}

function addAskTimeThread(convo) {
    convo.addQuestion({ text: 'Time?' }, function (res, convo) {

        convo.setVar('timeText', res.text);

        var nextThread = getNextThread(convo);

        convo.gotoThread(nextThread);

    }, {}, 'ask_time');
}

function addVerifyTimeThread(convo) {

}

function addSummaryThread(convo) {

    convo.addMessage({ text: 'Ok, forecast from {{vars.city.address}} on {{vars.timeText}} is comming.', action: 'forecast' }, 'collect_inputs_summary');
}

function getNextThread(convo) {

    if (!convo.vars.cityText) {
        return 'ask_city';
    }

    if (convo.vars.cityText && !convo.vars.city) {
        return 'find_city'
    }

    if (!convo.vars.timeText) {
        return 'ask_time';
    }

    if (convo.vars.cityText && convo.vars.city && convo.vars.timeText) {
        return 'collect_inputs_summary';
    }

    return 'verify';
}

function getInitialThread(convo) {

    if (!convo.vars.cityText && !convo.vars.timeText) {
        return 'verify';
    }

    if (!convo.vars.cityText) {
        return 'ask_city';
    }
    if (!convo.vars.timeText) {
        return 'ask_time'
    }

    return 'find_city';
}

function addForecastThread(convo) {

    convo.beforeThread('forecast', function (convo, next) {
        weatherService.getForecast(convo.vars.city)
            .then(function (result) {
                convo.setVar('forecast', result.currently);
                next();
            })
            .catch(function (err) {
                //next(err);
                convo.gotoThread('forecast-not-available');
            })
    });

    convo.addMessage(
        {
            text: 'Weather forecast for {{vars.city.address}} for {{vars.timeText}} is {{vars.forecast.temperature}} degrees, humidity {{vars.forecast.humidity}}'
        }, 'forecast')

    convo.addMessage(
        {
            text: 'Forecast not available ATM, sorry.'
        }, 'forecast-not-available')
}


