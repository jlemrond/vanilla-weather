# Vanilla Weather Chat Bot

Simple Facebook Chat Bot to check the weather in a desired location.

## Install and Run

To start the chat bot simply install the dependencies via yarn and use the start command.  The chat bot will run in the same terminal window. This will get the server up and running but you will need to integrate with Facebook.

```shell
$ yarn
$ yarn serve
```

## Deploy to Heroku

Install Heroku CLI

```shell
$ brew install heroku
```

Initiate Heroku Dyno and push to Heroku.  Git will need to be active on your clone.

```shell
$ heroku login
$ heroku create
$ git push heroku master
```

Heroku will suply you with the URL that you will need to provide to Facebook as your end point.  You will need to set up two enviornment variables in Heroku.

```javascript
// This will be provided by Facebook from within the developer.facebook.com interface.
process.env.PAGE_ACCESS_TOKEN

// This will be created by you using any type of random password generator.  i.e. crypto
process.env.VERIFY_TOKEN
```
