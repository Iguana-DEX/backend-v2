const CHAIN_ID = require("../constants/chainIds.json");
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function (taskArgs, hre) {
  const remoteChainId = CHAIN_ID[taskArgs.targetNetwork];
  const omniCounter = await ethers.getContract("OmniCounter");

  // quote fee - default adapterParams are [1, 200000]
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 300000]
  );

  const endpoint = await ethers.getContractAt(
    "ILayerZeroEndpoint",
    ENDPOINTS[hre.network.name]
  );
  let fees = await endpoint.estimateFees(
    remoteChainId,
    omniCounter.address,
    "0x",
    false,
    adapterParams
  );
  console.log(`fees[0] (eth): ${ethers.utils.formatEther(fees[0])}`);

  let txFee = BigInt(fees[0]) * BigInt(1);

  let tx = await (
    await omniCounter.incrementCounter(remoteChainId, { value: String(txFee) })
  ).wait();
  console.log(
    `✅ Message Sent [${hre.network.name}] incrementCounter on destination OmniCounter @ [${remoteChainId}]`
  );
  console.log(`tx: ${tx.transactionHash}`);

  console.log(``);
  console.log(
    `Note: to poll/wait for the message to arrive on the destination use the command:`
  );
  console.log(`       (it may take a minute to arrive, be patient!)`);
  console.log("");
  console.log(`    $ npx hardhat --network ${taskArgs.targetNetwork} ocPoll`);
};
