"use strict";

const Restify = require('restify');
const server = Restify.createServer({
    name: 'VanillaMessenger'
});
const PORT = process.env.PORT || 3000;

// Tokens / Keys
const config = require('./config');


// Test
server.get('/', (request, response, next) => {
     response.send("Hello");
     return next();
});

server.listen(PORT, () => console.log(`Vanilla running on port: ${PORT}`));