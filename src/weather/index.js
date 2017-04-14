'use strict';
const YQL = require('yql');

let getWeather = (location, type = 'forecast') => {

    return new Promise((resolve, reject) => {
        let query = new YQL(`select ${type === 'current' ? 'item.condition, location' : '*'} from weather.forecast where woeid in (select woeid from geo.places(1) where text = "${location}")`);

        query.exec((error, response) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(response);
        })
    });

}

module.exports = getWeather;