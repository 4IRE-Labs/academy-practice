const {web3, deploymentAccountAddress} = require('../utils/web3');
const {deployContract} = require('../utils');
const w3utils = require('web3-utils');
const FireCoin = require('../build/contracts/FireCoin.json');
const fs = require('fs');


async function main(argv) {
  const output = await deploy4ireCoin(argv.totalSupply);
  fs.writeFileSync(`./results.${process.env.ENV}.json`, JSON.stringify(output, null, 4));
};

async function deploy4ireCoin(totalSupply) {
    const nonce = await web3.eth.getTransactionCount(deploymentAccountAddress);
    console.log(`\n[4ireCoin] deploying 4ire Coin.`);
    console.log(`\n[4ireCoin] total supply: ${w3utils.fromWei(totalSupply, 'ether')} 4IR`);
    const coin = await deployContract(FireCoin, [totalSupply], {from: deploymentAccountAddress, nonce});
    console.log(`\n[4ireCoin] Deployed to address: ${coin.options.address}.`);

    return {
        address: coin.options.address
    }
}


exports.handler = main;
exports.command = 'deploy [options]';
exports.describe = 'deploys 4ire Coin';
exports.builder = {
  totalSupply: {
    demandOption: false,
    type: 'string',
    default: "1000000000000000000000000"
  }
};