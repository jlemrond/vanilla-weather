const patternDictionary = [
    {
        pattern: '\\b(Hi|Hello|Hey)\\b',
        intent: 'hello'
    }, {
        pattern: '\\b(bye|exit)\\b',
        intent: 'exit'
    }, {
        pattern: '\\blike\\sin\\s\\b(.+)',
        intent: 'currentWeather',
        entities: ["city"]
    }, {
        pattern: '\\b(hot|cold|rainy|rain|snow|sunny|thunderstorms|windy|drizzle)\\b\\sin\\s\\b([a-z]+[ a-z]+?)\\b(today|tomorrow|day\\safter\\stomorrow)(?:\\?*)$',
        intent: 'weatherForecast',
        entities: ['weather', 'city', 'time']
    }, {
        pattern: '\\b(hot|cold|rainy|rain|snow|sunny|thunderstorms|windy|drizzle)\\b\\s\\b(today|tomorrow|day\\safter\\stomorrow)\\b\\sin\\s\\b([a-z]+[ a-z]+?)$',
        intent: 'weatherForecast',
        entities: ['weather', 'time', 'city']
    }
]




module.exports = patternDictionary;