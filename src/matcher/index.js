"use strict";

const patterns = require('../patterns');

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
            intent: getResult.intent
        })
    } else {
        return callback({});
    }

}

module.exports = matchPattern;