"use strict";

const colors = require('colors');
const dictionary = require('./dictionary');

let getFeel = (temp) => {

    if (temp < 5) {
        return "cold as balls";
    } else if (temp >= 5 && temp < 15) {
        return "pretty fucking cold";
    } else if (temp >= 15 && temp < 25) {
        return "moderatly uncomroftable";
    } else if (temp >= 25 && temp < 32) {
        return "kinda warm";
    } else if (temp >= 32 && temp < 40) {
        return "hot and sticky";
    } else {
        return "fucking hot yo";
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

let currentWeather = response => {

    if (response.query.results) {
        let channel = response.query.results.channel;
        let location = `${channel.location.city}, ${channel.location.country}`;
        let {text, temp, code} = channel.item.condition;

        return `Right now, ${getPrefix(code)} ${text.toLowerCase().red.bold} in ${location.bold}.  It is ${getFeel(temp).green.bold} at ${temp.red.bold} degrees Celcius.`;
    }

}

module.exports = {
    currentWeather
};