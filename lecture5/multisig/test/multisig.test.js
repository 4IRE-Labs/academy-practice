const MultisigWallet = artifacts.require("MultisigWallet.sol");
const BN = require('bn.js');
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bn')(BN))
  .should();

contract('MultisigWallet', async ([owner0, owner1, owner2, notOwner]) => {

  describe('# MultisigWallet basic functions', async () => {
    it ("should deploy multisig with correct number of owners and required signatures", async () => {
      const wallet = await MultisigWallet.new([owner0, owner1, owner2], 2);
      const owners = await wallet.getOwners();
      owners[0].should.be.equal(owner0);
      owners[1].should.be.equal(owner1);
      owners[2].should.be.equal(owner2);
      (await wallet.getRequiredSigs()).should.be.bignumber.equal("2");
    });
  });

});