"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const Q = require("q");
const utf8 = require("utf8");
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
            return Q.reject(response);
        }
        return {
            address: response.results[0].formatted_address,
            location: response.results[0].geometry.location
        };
    });
}
exports.geocode = geocode;
//# sourceMappingURL=GoogleGeocoder.js.map