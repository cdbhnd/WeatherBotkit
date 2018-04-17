import * as request from 'request-promise';
import * as Q from 'q';
import * as utf8 from 'utf8';

export function geocode(address) {

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
            }
        });
}