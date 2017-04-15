'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather, forecastWeather} = require('./parser');

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {

    matcher(reply, data => {
        switch (data.intent) {

            // Standard Greeting
            case "hello":
                console.log(`${data.entities[1]} there.`);
                rl.prompt();
                break;

            // Exit case
            case "exit":
                console.log("Bye Bye Now");
                process.exit(0);
                break;

            // Get current weather
            case "currentWeather":
                console.log(`Let me check....`);
                weather(data.entities.city, 'current')
                    .then((response) => {
                        let parseResult = currentWeather(response);
                        console.log(parseResult);
                        rl.prompt();
                    })
                    .catch((error) => {
                        console.log("There seems to be an problem.");
                        rl.prompt();
                    })
                rl.prompt();
                break;

            // Get a weather forecast
            case "weatherForecast": 
                console.log("Let me check...");
                weather(data.entities.city)
                    .then(response => {
                        let parseResult = forecastWeather(response, data);
                        console.log(parseResult);
                        rl.prompt();
                    })
                    .catch(error => {
                        console.log("There seems to be a problem.");
                        rl.prompt();
                    })
                rl.prompt();
                break;

            // Unable to recognize input
            default:
                console.log("What now?!?!");
                rl.prompt();
        }
    })

});