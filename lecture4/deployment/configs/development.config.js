const utils = require('web3-utils');

exports.deployment = {
    rpcUrl: "http://localhost:8545",
    gasLimit: 9000000,
    gasPrice: utils.toWei('1', 'gwei'),
    getReceiptInterval: 100,
    deploymentAccountAddress: "0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39", // address used to deploy games
    deploymentPrivateKey: Buffer.from("2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200", "hex"),
}