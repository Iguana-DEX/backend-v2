const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function ({ deployments, getNamedAccounts }) {
  const owner = (await ethers.getSigners())[0];
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(`>>> your address: ${deployer}`);

  // get the Endpoint address
  const endpointAddr = LZ_ENDPOINTS[hre.network.name];
  console.log(`>>> [${hre.network.name}] Endpoint address: ${endpointAddr}`);

  signers = await ethers.getSigners();
  let gasPriceSetting = await signers[0].getGasPrice();
  gasPriceSetting = BigInt(gasPriceSetting) * BigInt(2);

  let pingPong = await deploy("PingPong", {
    from: deployer,
    args: [endpointAddr],
    log: true,
    waitConfirmations: 1,
    gasPrice: gasPriceSetting,
  });

  let eth = "0.01";
  let tx = await (
    await owner.sendTransaction({
      to: pingPong.address,
      gasPrice: String(gasPriceSetting),
      value: ethers.utils.parseEther(eth),
    })
  ).wait();
  console.log(`send it [${eth}] ether | tx: ${tx.transactionHash}`);
};

module.exports.tags = ["PingPong"];
