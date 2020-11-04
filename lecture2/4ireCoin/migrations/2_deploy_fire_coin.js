const FireCoin = artifacts.require("FireCoin");

module.exports = function (deployer) {
  deployer.deploy(FireCoin, "1000000000000000000000000");
};
