module.exports = (bot, msg) => {
  const chatId = msg.chat.id;

  const helpText = `
📖 *WeatherBot Help*

Available commands:
/start - Start the bot and get a welcome message
/weather <city> - Get current weather for the specified city
/help - Show this help message

Simply type /weather followed by a city name to get the weather update.
`;

  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
};