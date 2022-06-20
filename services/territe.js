const axios = require('axios').default;

class Territe {
  async getTerrite() {
    const nkt_mbx_data = await axios.get('https://ninokuni.marblex.io/api/price?tokenType=NKT');
    const mbx_data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=marblex&vs_currencies=usd,brl');
    const nkt_mbx = `${
      nkt_mbx_data.data.currencies.MBX.priceMajor
    }.${nkt_mbx_data.data.currencies.MBX.priceMinor.substring(0, 4)}`;
    const nkt_brl = Math.round(nkt_mbx * mbx_data.data.marblex.brl * 100) / 100;
    const nkt_usd = Math.round(nkt_mbx * mbx_data.data.marblex.usd * 100) / 100;
    const nkt_percent = `${
      nkt_mbx_data.data.currencies.MBX.percentMajor
    }.${nkt_mbx_data.data.currencies.MBX.percentMinor.substring(0, 2)}`;
    return {
      nkt_mbx: parseFloat(nkt_mbx).toFixed(4),
      nkt_brl: parseFloat(nkt_brl).toFixed(2),
      nkt_usd: parseFloat(nkt_usd).toFixed(2),
      nkt_percent: parseFloat(nkt_percent).toFixed(2),
    };
  }
}

module.exports = Territe;
