/* Chatbots.js */

'use strict';

const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');

let triggers = ['wf-slackbot'];
let nlp = require('./NLP.js');

const rtm = new RTMClient(process.env.SLACK_OAUTH);
const web = new WebClient(slack_oauth);

exports.Chatbot = class {
  constructor() {
      rtm.start();
  }
};


let sendMessage = function(message_id, message, attach) {
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