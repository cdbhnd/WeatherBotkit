"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WeatherConversation_1 = require("../WeatherConversation");
function format(format) {
    let result = '';
    switch (format) {
        case WeatherConversation_1.ForecastOutputFormat.Humidity:
            result = 'Humidity {{vars.payload.forecast.humidity}}';
            break;
        case WeatherConversation_1.ForecastOutputFormat.Raining:
            result = '{{vars.payload.forecast.isRainingText}}';
            break;
        case WeatherConversation_1.ForecastOutputFormat.Temperature:
            result = 'It can reach {{vars.payload.forecast.temperature}} °Celsius';
            break;
        case WeatherConversation_1.ForecastOutputFormat.Default:
        default:
            result = 'It can reach {{vars.payload.forecast.temperature}} °Celsius, Humidity {{vars.payload.forecast.humidity}}, Wind Speed {{vars.payload.forecast.windSpeed}} km/h, Raining:{{vars.payload.forecast.isRaining}}';
            break;
    }
    return result;
}
exports.format = format;
//# sourceMappingURL=WeatherAnswerFormatter.js.map