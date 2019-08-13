const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c5d45c1e6bc4664f05ad7c45e7ab9d7b/' + lat + ',' + long + '?lang=en'
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if(body.code){
            callback("Unable to find location!", undefined);
        }else{
            const {temperature, precipProbability} = body.currently;
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degress out. There is a ' + precipProbability + '% chance of rain');
        }
        
    });
}

module.exports = forecast