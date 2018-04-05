var request = require('request-promise');
var $q = require('q');
var utf8 = require('utf8');

module.exports = {
    geocode: geocode
}

function geocode(address) {

    var encodedAddress = utf8.encode(address);

    var opts = {
        method: 'GET',
        uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyDbzxbMNI8Q9Ppmg9pWqcxwm-fC-nH5sQA',
        json: true
    };

    return request(opts)
        .then(function (response) {
            if (response.status != 'OK') {
                return $q.reject(response);
            } 
            return {
                address: response.results[0].formatted_address,
                location: response.results[0].geometry.location
            }
        });
}