"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
function getForecast(payload, period) {
    var opts = {
        method: 'GET',
        uri: 'https://api.darksky.net/forecast/33204c32f0496d3fd7335aeef648dcc8/' + payload.location.lat + ',' + payload.location.lng + '?units=si',
        json: true
    };
    return request(opts)
        .then(function (result) {
        if (period === 'today') {
            return enhanceResult(result.currently);
        }
        if (period === 'tomorrow') {
            return enhanceResult(result.daily.data[1]);
        }
        if (period === 'nextweek') {
            return enhanceResult(result.daily.data[6]);
        }
    });
}
exports.getForecast = getForecast;
function enhanceResult(result) {
    if (result.principType === 'rain') {
        result.isRaining = 'Yes';
        result.isRainingText = 'It is going to rain.';
    }
    else {
        result.isRaining = 'No';
        result.isRainingText = 'It is not going to rain.';
    }
    if (!result.temperature) {
        result.temperature = result.temperatureHigh;
    }
    return result;
}
//# sourceMappingURL=WeatherGateway.js.map