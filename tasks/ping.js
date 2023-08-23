const CHAIN_ID = require("../constants/chainIds.json");
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");
const { getDeploymentAddresses } = require("../utils/readStatic");

module.exports = async function (taskArgs, hre) {
  const dstChainId = CHAIN_ID[taskArgs.targetNetwork];
  const dstPingPongAddr = getDeploymentAddresses(taskArgs.targetNetwork)[
    "PingPong"
  ];
  // get local contract instance
  const pingPong = await ethers.getContract("PingPong");
  console.log(`[source] pingPong.address: ${pingPong.address}`);

  // quote fee with default adapterParams
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 700000]
  );

  const endpoint = await ethers.getContractAt(
    "ILayerZeroEndpoint",
    ENDPOINTS[hre.network.name]
  );
  let fees = await endpoint.estimateFees(
    dstChainId,
    pingPong.address,
    "0x",
    false,
    adapterParams
  );
  console.log(`fees[0] (eth): ${ethers.utils.formatEther(fees[0])}`);

  let txFee = BigInt(fees[0]) * BigInt(10);

  let tx = await (
    await pingPong.ping(
      dstChainId,
      dstPingPongAddr,
      0 /*start at 0 pings counter*/,
      { value: String(txFee) }
    )
  ).wait();
  console.log(
    `✅ Pings started! [${hre.network.name}] pinging with target chain [${taskArgs.targetNetwork}] @ [${dstPingPongAddr}]`
  );
  console.log(`...tx: ${tx.transactionHash}`);
};
