require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const weatherCommand = require('./commands/weather');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const userStates = {};
// Register commands
bot.setMyCommands([
  { command: '/start', description: 'Start the bot' },
  { command: '/help', description: 'Show help information' },
  { command: '/weather', description: 'Get current weather' }
]);

// Handle commands
bot.onText(/\/start/, (msg) => startCommand(bot, msg));
bot.onText(/\/help/, (msg) => helpCommand(bot, msg));
bot.onText(/\/weather$/, (msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = { waitingForCity: true };

  bot.sendMessage(chatId, 'Please enter the city name to get the weather:');
});

bot.onText(/\/weather (.+)/, (msg, match) => {
  weatherCommand(bot, msg, match);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/')) return;

  if (userStates[chatId]?.waitingForCity) {
    userStates[chatId].waitingForCity = false;

    const match = [null, text]; 
    weatherCommand(bot, msg, match);
  }
});
