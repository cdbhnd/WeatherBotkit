var request = require('request-promise')

module.exports = function (controller) {

    controller.hears('What is capital of (.*)', 'message_received', function (bot, message) {

        var country = message.match[1];

        executeRequest('GET', 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=true')
            .then(function (result) {
                var capital = result[0].capital;
                bot.reply(message, 'Capital of ' + country + ' is ' + capital);
            })
            .catch(function (err) {
                bot.reply(message, 'Sorry, I never heard of country ' + country)
            })
    });
}

function executeRequest(method, uri) {

    var opts = {
        method: method,
        uri: uri,
        json: true
    };

    return request(opts);
}
