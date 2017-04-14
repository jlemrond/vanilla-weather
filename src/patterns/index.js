const patternDictionary = [
    {
        pattern: '\\b(Hi|Hello|Hey)\\b',
        intent: 'hello'
    }, {
        pattern: '\\b(bye|exit)\\b',
        intent: 'exit'
    }, {
        pattern: '\\blike\\sin\\s\\b(.+)',
        intent: 'currentWeather'
    }
]




module.exports = patternDictionary;