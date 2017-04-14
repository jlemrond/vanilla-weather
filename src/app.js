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
        console.log(data);
        switch (data.intent) {
            case "hello":
                console.log("Why hello there");
                rl.prompt();
                break;
            case "exit":
                console.log("Bye Bye Now");
                process.exit(0);
                break;
            default:
                console.log("What now?!?!");
                rl.prompt();
        }
    })

});