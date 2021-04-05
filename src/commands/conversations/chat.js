module.exports = [
  {
    name: 'میخوام',
    description: 'یچیزی میخواد :|',
    execute(message, args) {
      console.log('mikham called:/');
      const req = args[0];
      if (req === 'برم') {
        const msgs = ['به مار راستم', 'بابای'];
        const randomNumber = parseInt(Math.random() * 2);
        message.reply(msgs[randomNumber] ?? `بای`);
      }
    }
  }, {
    name: 'من',
    description: 'اون یچیزی میگه',
    execute(message, args) {
      console.log('man called:/');
      const req = args[0];
      if (req === 'رفتم') {
        message.reply(`بسلامت:/`);
      } else if (req === 'کیم؟' || req === 'کیم') {
        message.reply(`\n\`${message.author.username}\`\n هستی بمولا`);
      }
    }
  }, {
    name: ['تعداد', 'چنتا'],
    description: 'تعداد چیزایی که میخایو میگه:/',
    execute(message, args) {
      const req = args[0];
      if (req === 'ممبرا' || req === 'ممبر') {
        // console.log(message.guild.memberCount);
        const count = message.guild.memberCount;
        message.reply(`\n اینقد ممبر داریم: ${count} ( با خودم البته:) )`);
      }
    }
  }
]