const Server  = require('./libs/Server.js');
const cb      = require('./libs/Chatbot.js');

let something = process.env.TEST;
console.log(something);
let r = new cb.Chatbot();
