'use strict';

// expressを読み込み

const express = require('/home/pi/.nvm/versions/node/v8.11.1/lib/node_modules/express');
//var express = require("express");
const line = require('/home/pi/.nvm/versions/node/v8.11.1/lib/node_modules/@line/bot-sdk');
var app = express();

const PORT = process.env.PORT || 3000


const config = {
  channelAccessToken: 'g3ZnmR70Qm4nfqNKCVCam4jpVJLpQZANXbrdqOuHntqnuJrASS2m0Ltxi9y6qIjgYtwQY/N7RfGH85uKH7Mf7tDogVGuBOQM2tAo6ntmqO1s3bnqteLcX9TmkCa2xsjAyC8d/bl7zYt6h8zDFlKmhwdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'db5efc78bc792fa15a4ff6419b1313f7'
}

app.post('/webhook', line.middleware(config), (req, res) => {

      console.log(req.body.events);
      Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));x
//  req.body.events // webhook event objects
//  req.body.destination // user ID of the bot (optional)
});


const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
//kokomade ok

    //let mes = 'ok';
    let mes = event.message.text;

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: mes
    });
}

app.listen(PORT)
console.log(`Server running at ${PORT}`);
