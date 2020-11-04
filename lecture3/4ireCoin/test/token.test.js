const FireCoin = artifacts.require("FireCoin.sol");
require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('FireCoin', async ([owner, bank, recipient]) => {

  describe('# Token basic functions', async () => {
    it ("should deploy token with correct name", async () => {
      const token = await FireCoin.new("1000000");
      (await token.name()).should.be.equal("4ireCoin");
    });
  });

});