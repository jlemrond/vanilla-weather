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
    fb.incoming(request, response, msg => {
        console.log(msg);
    })
});

server.listen(PORT, () => console.log(`Vanilla running on port: ${PORT}`));