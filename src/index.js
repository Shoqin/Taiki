require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventhandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventhandler(client);

client.login(process.env.TOKEN);
