"use strict";

const patterns = require('../patterns');

let createEntities = (str, pattern) => {
    let regex = new RegExp(pattern, 'i');
    return regex.exec(str);
}

let matchPattern = (input, callback) => {

    let getResult = patterns.find(item => {
        let regex = new RegExp(item.pattern, 'i');
        let result = regex.test(input);
        if (result) {
            return true;
        }
    });

    if (getResult) {
        return callback({
            intent: getResult.intent,
            entities: createEntities(input, getResult.pattern)
        })
    } else {
        return callback({});
    }

}

module.exports = matchPattern;