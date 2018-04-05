var request = require('request-promise');
var $q = require('q');

module.exports = {
    getForecast: getForecast
}

function getForecast(payload) {

    var opts = {
        method: 'GET',
        uri: 'https://api.darksky.net/forecast/33204c32f0496d3fd7335aeef648dcc8/' + payload.location.lat + ',' + payload.location.lng+'?units=si',
        json: true
    };

    //return $q.reject('pera');

    return request(opts)
        .then(function (response) {
            console.log(response);
            return response;
        });
}