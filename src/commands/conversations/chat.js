module.exports = [
  {
    name: 'میخوام',
    description: 'یچیزی میخواد :|',
    execute(message, args) {
      console.log('mikham called:/');
      const req = args[0];
      if (req === 'برم') {
        const msgs = ['به مار راستم', 'بابای'];
        message.reply(msgs[Math.random()]);
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
        message.reply(`\n${message.author.username} هستی بمولا`);
      }
    }
  }
]