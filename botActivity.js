const Inetrium = require("./services/inetrium");
const Territe = require("./services/territe");
const Asterite = require("./services/asterite");

const inetriumService = new Inetrium();
const territeService = new Territe();
const asteriteService = new Asterite();

class Status {
  constructor() {
    this.arrayOfStatus = [];
    this.index = 0;
  }

  async updateArray() {
    const { itu_mbx, itu_brl, itu_usd, itu_percent } =
      await inetriumService.getInetrium();
    const { nkt_mbx, nkt_brl, nkt_usd, nkt_percent } =
      await territeService.getTerrite();
    const { nka_mbx, nka_brl, nka_usd, nka_percent } =
      await asteriteService.getAsterite();
    this.arrayOfStatus = [
      `ITU ${itu_mbx} | ${itu_percent}%`,
      `ITU $ ${itu_usd} | ${itu_percent}%`,
      `ITU R$ ${itu_brl} | ${itu_percent}%`,
      `NKT ${nkt_mbx} | ${nkt_percent}%`,
      `NKT $ ${nkt_usd} | ${nkt_percent}%`,
      `NKT R$ ${nkt_brl} | ${nkt_percent}%`,
      `NKA ${nka_mbx} | ${nka_percent}%`,
      `NKA $ ${nka_usd} | ${nka_percent}%`,
      `NKA R$ ${nka_brl} | ${nka_percent}%`,
    ];

    return;
  }

  getStatus() {
    if (this.index === this.arrayOfStatus.length) this.index = 0;
    else this.index++;
    return this.arrayOfStatus[this.index];
  }
}

module.exports = Status;
