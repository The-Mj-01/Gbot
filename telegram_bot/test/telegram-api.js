// const TelegramBot = require('node-telegram-bot-api');
// require("dotenv").config();
 
// // replace the value below with the Telegram token you receive from @BotFather
// const token = process.env.TELEGRAM_API_TOKEN;
 
// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: false});
 
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message
 
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
 
//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });



/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */
require("dotenv").config();

const TOKEN = process.env.TELEGRAM_API_TOKEN 
const url = 'https://a1cc074d.ngrok.io';
const port = process.env.PORT;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});