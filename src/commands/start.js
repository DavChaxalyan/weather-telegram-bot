module.exports = (bot, msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'there';

  const welcomeMessage = `
👋 Hello, ${firstName}!

Welcome to the WeatherBot 🌤️ — your friendly assistant to get current weather updates.

You can use the following commands:
/weather — get the weather for your city
/help — see available commands

Just send /weather followed by your city name, for example:
/weather London
`;

  bot.sendMessage(chatId, welcomeMessage);
};