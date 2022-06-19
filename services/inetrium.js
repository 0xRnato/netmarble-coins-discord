const axios = require('axios').default;

class Inetrium {
  async getInetrium() {
    const itu_mbx_data = await axios.get('https://inetrium.marblex.io/api/price');
    const mbx_data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=marblex&vs_currencies=usd,brl');
    const itu_mbx = `${
      itu_mbx_data.data.currencies.MBX.priceMajor
    }.${itu_mbx_data.data.currencies.MBX.priceMinor.substring(0, 4)}`;
    const itu_brl = Math.round(itu_mbx * mbx_data.data.marblex.brl * 100) / 100;
    const itu_usd = Math.round(itu_mbx * mbx_data.data.marblex.usd * 100) / 100;
    const itu_percent = `${
      itu_mbx_data.data.currencies.MBX.percentMajor
    }.${itu_mbx_data.data.currencies.MBX.percentMinor.substring(0, 2)}`;
    return {
      itu_mbx,
      itu_brl,
      itu_usd,
      itu_percent,
    };
  }
}

module.exports = Inetrium;