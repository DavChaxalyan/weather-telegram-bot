const { getWeather } = require('../services/weatherService');

module.exports = async (bot, msg, match) => {
  const chatId = msg.chat.id;
  const city = match[1];

  if (!city) {
    return bot.sendMessage(chatId, 'Please specify a city. Example: /weather London');
  }

  try {
    const weather = await getWeather(city);

    const weatherMessage = `
🌤 Weather in *${weather.city}, ${weather.country}*:
- Temperature: ${weather.temperature} °C
- Condition: ${weather.description}
- Humidity: ${weather.humidity}%
- Wind speed: ${weather.windSpeed} m/s
    `;

    bot.sendMessage(chatId, weatherMessage, { parse_mode: 'Markdown' });
  } catch (err) {
    bot.sendMessage(chatId, err.message);
  }
};