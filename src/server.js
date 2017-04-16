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

// Vanilla Weather
const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather, forecastWeather} = require('./parser');


// Register the webhook
server.get('/', (request, response, next) => {
    fb.registerHook(request, response);
    return next();
});

// Recieving Post Requests
server.post('/', (request, response, next) => {
    fb.incoming(request, response, message => {
        // fb.textMessage(message.sender, `Hey you just said ${message.message.text}.`)
        // fb.imageMessage(message.sender, "https://unsplash.it/500/450?random");

        if (message.message.text) {
            matcher(message.message.text, data => {

                switch(data.intent) {
                    case "hello":
                        fb.textMessage(message.sender, `${data.entities[1]} there.`);
                        break;

                    case "currentWeather":
                        fb.textMessage(message.sender, "Let me check....");
                        weather(data.entities.city, 'current')
                            .then((response) => {
                                let parseResult = currentWeather(response);
                                fb.textMessage(message.sender, parseResult);
                            })
                            .catch((error) => {
                                console.log(error);
                                fb.textMessage(message.sender, "There seems to be a problem.");
                            })
                        break;
                    
                    case "weatherForecast": 
                        weather(data.entities.city)
                            .then(response => {
                                let parseResult = forecastWeather(response, data);
                                fb.textMessage(message.sender, parseResult);
                            })
                            .catch(error => {
                                console.log(error);
                                fb.textMessage(message.sender, "Ahh crap....\nSomething went wrong.");
                            })
                        break;

                    default:
                        fb.textMessage(message.sender, "Ummm... what do you mean?");
                }
            })

        }

    })
});

fb.subscribe();

server.listen(PORT, () => console.log(`Vanilla running on port: ${PORT}`));