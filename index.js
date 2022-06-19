const Discord = require('discord.js');

const config = require('./config.json');
const Territe = require('./services/territe');
const Asterite = require('./services/asterite');
const Inetrium = require('./services/inetrium');

const inetriumService = new Inetrium();
const territeService = new Territe();
const asteriteService = new Asterite();

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const prefix = '!';

// client.on("ready", () => {
//     console.log(`${client.user.username} has logged on`);
//     let index = 0;
//     let arrayOfStatus = [];
//     setInterval(async () => {
//         const itu_mbx_data = await axios.get('https://inetrium.marblex.io/api/price');
//         const itu_mbx = `${itu_mbx_data.data.currencies.MBX.priceMajor}.${itu_mbx_data.data.currencies.MBX.priceMinor.substring(0, 4)}`;
//         const mbx_data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=marblex&vs_currencies=usd,brl');
//         const itu_brl = Math.round(itu_mbx * mbx_data.data.marblex.brl * 100) / 100;
//         const itu_usd = Math.round(itu_mbx * mbx_data.data.marblex.usd * 100) / 100;
//         arrayOfStatus = [`MBX/ITU: ${itu_mbx}`, `USD/ITU: $ ${itu_usd}`, `BRL/ITU: R$ ${itu_brl}`];
//         if (index === arrayOfStatus.length) index = 0;
//         const status = arrayOfStatus[index];
//         client.user.setActivity(status);
//         index++;
//     }, 30000);
// });

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const mbx_emoji = message.guild.emojis.cache.find((emoji) => emoji.name === 'flag_mbx');

  let response;
  switch (command) {
    case 'itu':
    case 'inetrium':
      const { itu_mbx, itu_brl, itu_usd, itu_percent } = await inetriumService.getInetrium();
      if (args.length < 1) {
        response = `1x ITU\nPrice change: ${itu_percent}%\n${mbx_emoji} ${Number(
          itu_mbx,
        )}\n:flag_us: $ ${itu_usd}\n:flag_br: R$ ${itu_brl}`;
      } else {
        response = `${args[0]}x ITU\nPrice change: ${itu_percent}%\n${mbx_emoji} ${
          Number(itu_mbx) * args[0]
        }\n:flag_us: $ ${itu_usd * args[0]}\n:flag_br: R$ ${itu_brl * args[0]}`;
      }
      break;
    case 'nkt':
    case 'territe':
      const { nkt_mbx, nkt_brl, nkt_usd, nkt_percent } = await territeService.getTerrite();
      if (args.length < 1) {
        response = `1x NKT\nPrice change: ${nkt_percent}%\n${mbx_emoji} ${Number(
          nkt_mbx,
        )}\n:flag_us: $ ${nkt_usd}\n:flag_br: R$ ${nkt_brl}`;
      } else {
        response = `${args[0]}x NKT\nPrice change: ${nkt_percent}%\n${mbx_emoji} ${
          Number(nkt_mbx) * args[0]
        }\n:flag_us: $ ${nkt_usd * args[0]}\n:flag_br: R$ ${nkt_brl * args[0]}`;
      }
      break;
    case 'nka':
    case 'asterite':
      const { nka_mbx, nka_brl, nka_usd, nka_percent } = await asteriteService.getAsterite();
      if (args.length < 1) {
        response = `1x NKA\nPrice change: ${nka_percent}%\n${mbx_emoji} ${Number(
          nka_mbx,
        )}\n:flag_us: $ ${nka_usd}\n:flag_br: R$ ${nka_brl}`;
      } else {
        response = `${args[0]}x NKA\nPrice change: ${nka_percent}%\n${mbx_emoji} ${
          Number(nka_mbx) * args[0]
        }\n:flag_us: $ ${nka_usd * args[0]}\n:flag_br: R$ ${nka_brl * args[0]}`;
      }
      break;
    default:
      break;
  }
  message.reply(response);
  return;
});

client.login(config.BOT_TOKEN);
