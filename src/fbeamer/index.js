'use strict';

const request = require('request');

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

    subscribe() {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/subscribed_apps',
            qs: {
                access_token: this.PAGE_ACCESS_TOKEN
            },
            method: "POST",

        }, (error, response, body) => {
            if (!error && JSON.parse(body).success) {
                console.log("Subscribed to Good Vibes.");
            } else {
                console.log(error);
            }
        })
    }

    registerHook(request, response) {
        let mode = request.query['hub.mode'];
        let verify_token = request.query['hub.verify_token'];
        let challenge = request.query['hub.challenge'];

        console.log(mode);

        if (mode === "subscribe" && verify_token === this.VERIFY_TOKEN) {
            console.log("App Registered with Facebook.");
            return response.send(challenge)
        } else {
            console.log("Could not register webhook!");
            response.send(403).end();
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

    sendMessage(payload) {

        return new Promise((resolve, reject) => {
            request({
                uri: "https://graph.facebook.com/v2.6/me/messages",
                qs: {
                    access_token: this.PAGE_ACCESS_TOKEN
                },
                method: "POST",
                json: payload
            }, (error, response) => {
                if (error && response.statusCode !== 200) {
                    reject(error);
                }

                resolve({
                    messageId: body.message_id
                });
            });
        })

    }

    textMessage(id, text) {
        let message = {
            recipient: {
                id
            },
            message: {
                text
            }
        }

        this.sendMessage(message)
            .catch(error => console.log(error));
    }

    imageMessage(id, url) {
        let message = {
            recipient: {
                id
            },
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url
                    }
                }
            }
        }

        this.sendMessage(message)
            .catch(error => console.log(error));
    }

}

module.exports = FBeamer;