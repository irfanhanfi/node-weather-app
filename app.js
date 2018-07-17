const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const yargs = require('yargs');

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

geocode.geocodeAddress(argv.address, function(errorMsg, result){
    if (errorMsg){
        console.log(errorMsg);
    }else{
        console.log(JSON.stringify(result, undefined, 2));
        weather.getLocationWeather(result.latitude, result.longitude, function(errorMsg, result){
            if (errorMsg){
                console.log(errorMsg);
            }else{
                console.log(result);
            }
        });
    }
});

//
