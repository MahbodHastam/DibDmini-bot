const { PREFIX, BOT_TOKEN, SRC_DIR } = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const utils = require('./utils');

global.rootDir = require('path').resolve(__dirname + '/../');
global.dataDir = `${rootDir}/data`;

utils.checkDirectories();

client.login(BOT_TOKEN);
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(`./${SRC_DIR}commands`)
  .filter(file => file.endsWith('js'));
const conversationFiles = fs
  .readdirSync(`./${SRC_DIR}commands/conversations`)
  .filter(file => file.endsWith('js'));
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
    if (typeof commandObject.name === 'string') {
      client.commands.set(commandObject.name, commandObject);
    } else if (typeof commandObject.name === 'object') {
      commandObject.name.forEach(name => {
        client.commands.set(name, commandObject);
      });
    }
  });
}

client.on('message', message => {
  args = message.content.slice(PREFIX.length).trim().split(/ +/);

  utils.checkBayad(message, args);

  if (message.content === PREFIX) {
    message.reply(`بلی`);
  }
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`فک کنم کِرم زدم، به \`Mahbod#1890\` بگین:/`);
  }
});