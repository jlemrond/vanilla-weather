'use strict';

class FBeamer {

    constructor(config) {
        try {
            if (!config || config.PAGE_ACCESS_TOKEN === undefined || config.VERIFY_TOKEN === undefined) {
                throw new Error("Unable to access tokens.");
            }

            this.PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;
            this.VERIFY_TOKEN = config.VERIFY_TOKEN;
        } catch (error) {
            console.log(error);
        }
    }

    registerHook(request, response) {
        let mode = request.query['hub.mode'];
        let verify_token = request.query['hub.verify_token'];
        let challenge = request.query['hub.challenge'];

        console.log(mode);

        if (mode === "subscribe" && verify_token === this.VERIFY_TOKEN) {
            return response.end(challenge)
        } else {
            console.log("Could not register webhook!");
            response.status(403).end();
        }
    }

    incoming(request, response, callback) {
        let data = request.body;
        if (data.object === 'page') {
            data.entry.forEach(pageObj => {

                pageObj.messaging.forEach(msgEvent => {
                    let messageObj = {
                        sender: msgEvent.sender.id,
                        timeOfMessage: msgEvent.timestamp,
                        message: msgEvent.message
                    }
                    callback(messageObj);
                });

            });
        }
        response.send(200);
    }

}

module.exports = FBeamer;