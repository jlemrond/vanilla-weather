'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather} = require('./parser');

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {

    matcher(reply, data => {
        switch (data.intent) {
            case "hello":
                console.log(`${data.entities[1]} there.`);
                rl.prompt();
                break;
            case "exit":
                console.log("Bye Bye Now");
                process.exit(0);
                break;
            case "currentWeather":
                console.log(`Let me check....`);
                weather(data.entities[1], 'current')
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
            default:
                console.log("What now?!?!");
                rl.prompt();
        }
    })

});