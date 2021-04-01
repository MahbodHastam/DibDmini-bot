const { PREFIX, BOT_TOKEN, SRC_DIR } = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(BOT_TOKEN);
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(`./${SRC_DIR}commands`)
  .filter(file => file.endsWith('js'));
const conversationFiles = fs
  .readdirSync(`./${SRC_DIR}commands/conversations`)
  .filter(file => file.endsWith('js'))
let args;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: 'idle',
    activity: { name: 'دیبی', type: 'LISTENING' },
  });
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of conversationFiles) {
  const command = require(`./commands/conversations/${file}`);
  command.forEach(commandObject => {
    client.commands.set(commandObject.name, commandObject);
  });
}

client.on('message', message => {
  if (message.content === PREFIX) {
    message.reply(`بلی`);
  }
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`Server error! Please tell the developer.`);
  }
});