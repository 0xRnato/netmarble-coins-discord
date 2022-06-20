const axios = require('axios').default;

class Asterite {
  async getAsterite() {
    const nka_mbx_data = await axios.get('https://ninokuni.marblex.io/api/price?tokenType=NKA');
    const mbx_data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=marblex&vs_currencies=usd,brl');
    const nka_mbx = `${
      nka_mbx_data.data.currencies.MBX.priceMajor
    }.${nka_mbx_data.data.currencies.MBX.priceMinor.substring(0, 4)}`;
    const nka_brl = Math.round(nka_mbx * mbx_data.data.marblex.brl * 100) / 100;
    const nka_usd = Math.round(nka_mbx * mbx_data.data.marblex.usd * 100) / 100;
    const nka_percent = `${
      nka_mbx_data.data.currencies.MBX.percentMajor
    }.${nka_mbx_data.data.currencies.MBX.percentMinor.substring(0, 2)}`;
    return {
      nka_mbx: parseFloat(nka_mbx).toFixed(4),
      nka_brl: parseFloat(nka_brl).toFixed(2),
      nka_usd: parseFloat(nka_usd).toFixed(2),
      nka_percent: parseFloat(nka_percent).toFixed(2),
    };
  }
}

module.exports = Asterite;
