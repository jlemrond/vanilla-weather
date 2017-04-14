'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const matcher = require('./matcher');

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
                rl.prompt();
                break;
            default:
                console.log("What now?!?!");
                rl.prompt();
        }
    })

});