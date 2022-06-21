const config = require('../config.json');

class Response {
  getResponse(token, price_change, quantity, mbx, usd, brl, mbx_emoji) {
    const embed = {
      color: 0x00ff00,
      title: `${config[token + "_name"]}`,
      url: `${config[token + "_url"]}`,
      thumbnail: {
        url: `${config[token + "_img"]}`,
      },
      fields: [
        {
          name: `${quantity}x ${config[token + "_symbol"]}`,
          value: `24h Price change: ${price_change}%\n${mbx_emoji} ${
            mbx * quantity
          }\n:flag_us: $ ${usd * quantity}\n:flag_br: R$ ${brl * quantity}`,
        },
      ],
      footer: {
        text: `Made with ❤️ by 0xRnato#5058\n0xe46304d046d71bca3e92b1400f8feef3ef3e7cd1`,
        icon_url: config.profile_img,
      },
    };
    return embed;
  }

  getStatus() {

  }
}

module.exports = Response;
