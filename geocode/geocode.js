const request = require('request');

const geocodeAddress = (address, callback) => {
    request({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address),
        json: true
    }, (error, response, body) => {
        if (error){
            callback('Unable to connect google server.')
        } else if (body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address.')
        } else if (body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            // console.log(JSON.stringify(`Address: ${body.results[0].formatted_address}`, undefined, 2));
            // console.log(JSON.stringify(`Latitude: ${body.results[0].geometry.location.lat}`, undefined, 2));
            // console.log(JSON.stringify(`Longitude: ${body.results[0].geometry.location.lng}`, undefined, 2));
        }
        
    });
}

module.exports.geocodeAddress = geocodeAddress;