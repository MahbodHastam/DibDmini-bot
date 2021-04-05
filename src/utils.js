const fs = require('fs');

module.exports.checkBayad = (message, args) => {
  const data = fs.readFileSync(`${dataDir}/guilds/${message.guild.id}/bayads.txt`, { encoding: 'utf-8' });
  const lines = data.split(/\r?\n/);

  lines.forEach(line => {
    const words = line.split(/ = /);
    if (message.content === words[0]) {
      message.reply(words[1]);
    }
  });
};

module.exports.checkDirectories = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdir(dataDir);
  }
  
  if (!fs.existsSync(`${dataDir}/guilds`)) {
    fs.mkdir(`${dataDir}/guilds`);
  }

  return;
};