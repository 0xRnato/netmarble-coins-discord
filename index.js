const Discord = require("discord.js");
var cron = require("node-cron");

const config = require("./config.json");
const Territe = require("./services/territe");
const Asterite = require("./services/asterite");
const Inetrium = require("./services/inetrium");
const Response = require("./helper/response");

const Status = require("./botActivity");

const inetriumService = new Inetrium();
const territeService = new Territe();
const asteriteService = new Asterite();
const status = new Status();

const _response = new Response();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "!";

const updateStatusJob = cron.schedule("* * * * *", () => {
  console.log("updating array");
  status.updateArray();
});

client.on("ready", () => {
  console.log([`Logged as ${client.user.tag}`].join("\n"));
  console.log("updating array");
  status.updateArray();
  updateStatusJob.start();
  setInterval(() => {
    console.log("updating status");
    const _status = status.getStatus();
    client.user.setActivity(_status);
  }, 10000);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  const mbx_emoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "flag_mbx"
  );

  let response;
  switch (command) {
    case "itu":
    case "inetrium":
      const { itu_mbx, itu_brl, itu_usd, itu_percent } =
        await inetriumService.getInetrium();
      response = _response.getResponse(
        "itu",
        itu_percent,
        args[0] || 1,
        itu_mbx,
        itu_usd,
        itu_brl,
        mbx_emoji
      );
      break;
    case "nkt":
    case "territe":
      const { nkt_mbx, nkt_brl, nkt_usd, nkt_percent } =
        await territeService.getTerrite();
      response = _response.getResponse(
        "nkt",
        nkt_percent,
        args[0] || 1,
        nkt_mbx,
        nkt_usd,
        nkt_brl,
        mbx_emoji
      );
      break;
    case "nka":
    case "asterite":
      const { nka_mbx, nka_brl, nka_usd, nka_percent } =
        await asteriteService.getAsterite();
      response = _response.getResponse(
        "nka",
        nka_percent,
        args[0] || 1,
        nka_mbx,
        nka_usd,
        nka_brl,
        mbx_emoji
      );
      break;
    case "help":
      const embed = {
        color: 0x0000ff,
        title: "Netmarble Coins",
        // url: `${config[token + '_url']}`,
        thumbnail: {
          url: "https://i.imgur.com/L2gLOxQ.png",
        },
        fields: [
          {
            name: "Inetrium",
            value: "!itu or !inetrium",
          },
          {
            name: "Territe",
            value: "!nkt or !territe",
          },
          {
            name: "Asterite",
            value: "!nka or !asterite",
          },
          {
            name: "Multiple values",
            value: "!nkt 5",
          },
        ],
        footer: {
          text: `Made with ❤️ by 0xRnato#5058\n0xe46304d046d71bca3e92b1400f8feef3ef3e7cd1`,
          icon_url: config.profile_img,
        },
      };
      response = embed;
    default:
      break;
  }

  message.reply({ embeds: [response] });
  return;
});

client.login(config.BOT_TOKEN);
