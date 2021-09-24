const Votaciones = artifacts.require("Votaciones");
module.exports = async function (deployer) {
  await deployer.deploy(Votaciones);
};
