import { ForecastOutputFormat } from '../WeatherConversation'

export function formatOutput(format) {

    let result = ''
    switch (format) {
        case ForecastOutputFormat.Humidity:
            result = 'Humidity {{vars.payload.forecast.humidity}}';
            break;
        case ForecastOutputFormat.Raining:
            result = '{{vars.payload.forecast.isRainingText}}';
            break;
        case ForecastOutputFormat.Temperature:
            result = 'It can reach {{vars.payload.forecast.temperature}} °Celsius';
            break;
        case ForecastOutputFormat.Default:
        default:
            result = 'It can reach {{vars.payload.forecast.temperature}} °Celsius, Humidity {{vars.payload.forecast.humidity}}, Wind Speed {{vars.payload.forecast.windSpeed}} km/h, Raining:{{vars.payload.forecast.isRaining}}'
            break;
    }
    return result;
}

export function formatPeriod(periodText) {
    
    if (new RegExp(/^(Today|today|now|immediately|Immediately|right now|Now)/i).test(periodText)) {
        return 'today';
    }

    if (new RegExp(/^(Tommorrow|tomorrow|next day|later|Later)/i)) {
        return 'tomorrow';
    }

    if (new RegExp(/^(Next week|next week|In couple of days)/i)) {
        return 'nextweek'
    }

    return 'today';
}