"use strict";

const Restify = require('restify');
const server = Restify.createServer({
    name: 'VanillaMessenger'
});
const PORT = process.env.PORT || 3000;

server.use(Restify.jsonp());
server.use(Restify.bodyParser());

// Tokens / Keys
const config = require('./config');

// FBeamer
const FBeamer = require('./fbeamer');
const fb = new FBeamer(config);


// Register the webhook
server.get('/', (request, response, next) => {
    fb.registerHook(request, response);
    return next();
});

// Recieving Post Requests
server.post('/', (request, response, next) => {
    fb.incoming(request, response, message => {
        fb.textMessage(message.sender, `Hey you just said ${message.message.text}.`)
        fb.imageMessage(message.sender, "https://unsplash.it/500/450?random");
    })
});

fb.subscribe();

server.listen(PORT, () => console.log(`Vanilla running on port: ${PORT}`));