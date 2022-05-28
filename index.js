const Discord = require("discord.js");
const axios = require('axios').default;
const config = require("./config.json");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "!";

client.on("ready", () => {
    console.log(`${client.user.username} has logged on`);
    let index = 0;
    let arrayOfStatus = [];
    setInterval(async () => {
        const itu_mbx_data = await axios.get('https://inetrium.marblex.io/api/price');
        const itu_mbx = `${itu_mbx_data.data.currencies.MBX.priceMajor}.${itu_mbx_data.data.currencies.MBX.priceMinor.substring(0, 4)}`;
        const mbx_data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=marblex&vs_currencies=usd,brl');
        const itu_brl = Math.round(itu_mbx * mbx_data.data.marblex.brl * 100) / 100;
        const itu_usd = Math.round(itu_mbx * mbx_data.data.marblex.usd * 100) / 100;
        arrayOfStatus = [`MBX/ITU: ${itu_mbx}`, `USD/ITU: $ ${itu_usd}`, `BRL/ITU: R$ ${itu_brl}`];
        if (index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status);
        index++;
    }, 30000);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const itu_mbx_data = await axios.get('https://inetrium.marblex.io/api/price');
    const itu_mbx = `${itu_mbx_data.data.currencies.MBX.priceMajor}.${itu_mbx_data.data.currencies.MBX.priceMinor.substring(0, 4)}`;
    const itu_mbx_percent = `${itu_mbx_data.data.currencies.MBX.percentMajor}.${itu_mbx_data.data.currencies.MBX.percentMinor.substring(0, 2)}`;
    const mbx_data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=marblex&vs_currencies=usd,brl');
    const itu_brl = Math.round(itu_mbx * mbx_data.data.marblex.brl * 100) / 100;
    const itu_usd = Math.round(itu_mbx * mbx_data.data.marblex.usd * 100) / 100;

    if (command === "itu" || command === "inetrium") {
        let response;
        if (args.length < 1) {
            response = 'no arg'
        } else {
            response = `arg: ${args[0]}`
        }
        message.reply(`Price change: ${itu_mbx_percent}%\nMBX/ITU: ${itu_mbx}\nUSD/ITU: $ ${itu_usd}\nBRL/ITU: R$ ${itu_brl}`);
    }
    return;
});

client.login(config.BOT_TOKEN);
