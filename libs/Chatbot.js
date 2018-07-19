/* Chatbots.js */

'use strict';

const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');

let triggers = ['wf-slackbot'];
let nlp = require('./NLP.js');

const rtm = new RTMClient(slack_oauth);
const web = new WebClient(slack_oauth);

exports.Chatbot = class {
  constructor() {
      rtm.start();
  }
};


let sendMessage = function(message_id, message, attach) {
    let rrr = {
        "text": "Choose a game to play",
        "fallback": "You are unable to choose a game",
        "callback_id": "wopr_game",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
            {
                "name": "game",
                "text": "Chess",
                "type": "button",
                "value": "chess"
            },
            {
                "name": "game",
                "text": "Falken's Maze",
                "type": "button",
                "value": "maze"
            },
            {
                "name": "game",
                "text": "Thermonuclear War",
                "style": "danger",
                "type": "button",
                "value": "war",
                "confirm": {
                    "title": "Are you sure?",
                    "text": "Wouldn't you prefer a good game of chess?",
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            }
        ]
    }
    web.chat.postMessage({ channel: message_id, text: message, attachments: attach})
        .then((res) => {
            // `res` contains information about the posted message
            //console.log(message);
            //console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
    /*rtm.sendMessage(message, message_id)
        .then((res) => {
            // `res` contains information about the posted message
            //console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
        */
};

rtm.on('message', (event) => {
    for(let i=0; i<triggers.length; i++) {
        if(String(event.text).includes(triggers[i])) {
            nlp.userText(event.text).then(function(data) {
                try {
                    let response = '';

                    for(let j=0; j<data.length; j++) {
                        response += data[j].content + ' ';
                    }

                    //console.log('+++++++');
                    //console.log(data);

                    //console.log(data[0].attachments);
                    sendMessage(event.channel, data[0].content, data[0].attachments);
                }catch(err){

                }
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
});