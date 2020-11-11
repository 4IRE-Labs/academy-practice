const MultisigWallet = artifacts.require("MultisigWallet.sol");
const BN = require('bn.js');
const w3utils = require('web3-utils');

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

    it("should allow to submit transaction", async () => {
      const wallet = await MultisigWallet.new([owner0, owner1, owner2], 2);
      const txResult = await wallet.submitTransaction(notOwner, w3utils.toWei('1', 'ether'), [0x0]).should.be.fulfilled;
      console.log(JSON.stringify(txResult.logs));

      const transactionId = txResult.logs[0].args['transactionId'];
      transactionId.should.be.bignumber.equal("0");

      const result = await wallet.getTransactionById(transactionId);
      result['receiver'].should.be.equal(notOwner);
    });

    it("should execute transaction when it has enough confirmations", async () => {
      const wallet = await MultisigWallet.new([owner0, owner1, owner2], 2);
      const txResult = await wallet.submitTransaction(notOwner, w3utils.toWei('1', 'ether'), [0x0], {value: w3utils.toWei('1', 'ether')}).should.be.fulfilled;
      const transactionId = txResult.logs[0].args['transactionId'];

      const result1 = await wallet.confirmTransaction(transactionId, {from: owner0}).should.be.fulfilled;
      result1.logs.length.should.be.equal(0);

      const result2 = await wallet.confirmTransaction(transactionId, {from: owner1}).should.be.fulfilled;
      result2.logs[0].event.should.be.equal("Execution");
    });
  });

});