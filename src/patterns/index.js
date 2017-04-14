const patternDictionary = [
    {
        pattern: '\b(Hi|Hello|Hey)\b',
        intent: 'Hello'
    }, {
        pattern: '\b(bye|exit)\b',
        intent: 'exit'
    }
]




module.exports = patternDictionary;