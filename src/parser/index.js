"use strict";

const dictionary = require('./dictionary');
const moment = require('moment');

let getFeel = (temp) => {

    if (temp < 5) {
        return "cold as balls";
    } else if (temp >= 5 && temp < 15) {
        return "pretty f*cking cold";
    } else if (temp >= 15 && temp < 25) {
        return "moderatly uncomroftable";
    } else if (temp >= 25 && temp < 32) {
        return "kinda warm";
    } else if (temp >= 32 && temp < 40) {
        return "hot and sticky";
    } else {
        return "way too god damn hot";
    }

}

let getPrefix = (conditionCode, tense = "present") => {
    let findPrefix = dictionary[tense].find(item => {
        if (item.codes.indexOf(Number(conditionCode)) > -1) {
            return true;
        }
    });

    return findPrefix.prefix || "";
}

let getDate = (day) => {
    let dayStr = day.toLowerCase().trim();
    switch (dayStr) {

        case 'tomorrow':
            return moment().add(1, 'd').format("DD MMM YYYY");
        case 'day after tomorrow':
            return moment().add(2, 'd').format("DD MMM YYYY");
        default: 
            return moment().format("DD MMM YYYY");

    }
}

let currentWeather = response => {

    if (response.query.results) {
        let channel = response.query.results.channel;
        let location = `${channel.location.city}, ${channel.location.country}`;
        let {text, temp, code} = channel.item.condition;

        return `Right now, ${getPrefix(code)} ${text.toLowerCase()} in ${location}.  It is ${getFeel(temp)} at ${temp} degrees Celcius.`;
    } else {
        return "I don't seem to know anything about this place";
    }

}

let forecastWeather = (response, data) => {

    if (response.query.results) {
        let parseDate = getDate(data.entities.time);
        let channel = response.query.results.channel;
        let getForecast = channel.item.forecast.filter(item => {
            return item.date === parseDate;
        })[0];
        let location = `${channel.location.city}, ${channel.location.country}`;

        let regEx = new RegExp(data.entities.weather, "i");
        let answer = regEx.test(getForecast.text) ? "Yes" : "No";

        return `${answer}, ${getPrefix(getForecast.code, "future").toLowerCase()} ${getForecast.text.toLowerCase()} ${data.entities.time} in ${location}.`;
    } else {
        return "What the hell are you talking about?"
    }

}

module.exports = {
    currentWeather,
    forecastWeather
};