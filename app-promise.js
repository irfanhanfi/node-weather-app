// const geocode = require('./geocode/geocode');
// const weather = require('./weather/weather');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            describe:'Address to fetch weather for',
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }

    var address = response.data.results[0].formatted_address;
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/9534e3c58fc47515816571b0dcb24c20/${latitude},${longitude}`;
    console.log(address);
    return axios.get(weatherUrl);
}).then((response) =>{
    var temperature = response.data.currently.temperature;
    var aaprentTemperature = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temperature}. It feels like ${aaprentTemperature}.`)
}).catch((error) => {
    console.log('error:',error)
});

