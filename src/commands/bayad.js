module.exports = {
  name: 'باید',
  description: 'با این دستور میتونی چیزمیز یادش بدی',
  execute(message, args) {
    console.log(args);
    if (args[0] === "بگی" && args[1] && args[2] && args[3]) {
      console.log(dataDir);
      this.saveBayad(message, args);
      message.reply(`چشم`);
    } else message.reply(`نَوَفَهمَم چی میگی`);
  },
  saveBayad(message, args) {
    const fs = require('fs');
    const dirName = message.guild.id;
    const dirPath = `${dataDir}/guilds/${dirName}`;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    // const command = '';
    const key = args[1];
    const value = args[3];
    fs.writeFileSync(`${dirPath}/bayads.txt`, `${key} = ${value}\n`, { flag: 'a+', encoding: 'utf-8', mode: 0o666 });
  }
};