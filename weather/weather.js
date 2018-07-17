const request = require('request');
const API_KEY = '9534e3c58fc47515816571b0dcb24c20';
const getLocationWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error){
            callback('Unable to connect server.')
        } else if(response.statusCode === 403){
            callback('Invalid API Key.')
        } else if (response.statusCode === 400){
            callback('Invalid Address.')
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
}

module.exports.getLocationWeather = getLocationWeather;
