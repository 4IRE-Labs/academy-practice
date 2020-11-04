const env = process.env.ENV || "development";
const {web3} = require('../utils/web3');
const w3utils = require('web3-utils');
const FireCoin = require('../build/contracts/FireCoin.json');
const config = require(`../results.${env}.json`);

async function main() {
  if (!config.address) {
    throw new Error(`4ireCoin is not deployed. Please deploy it to ${env} first.`);
  }

  const coin = new web3.eth.Contract(FireCoin.abi, config.address);  
  const name = await coin.methods.name().call();
  const decimals = await coin.methods.decimals().call();
  const symbol = await coin.methods.symbol().call();
  const totalSupply = await coin.methods.totalSupply().call();

  console.log(`Name: ${name}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total supply: ${w3utils.fromWei(totalSupply, "ether")} ${symbol}`)
};

exports.handler = main;
exports.command = 'info';
exports.describe = 'prints info about 4ire Coin';