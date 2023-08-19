require("dotenv").config();
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const ethers = require("ethers");
const { toUsd } = require("../test/shared/units");
const { expandDecimals } = require("../test/shared/utilities");

// Instantiate the SDK. All major chains and testnets are supported
// ('binance', 'binance-testnet', 'mainnet', 'goerli', 'optimism', 'arbitrum', 'avalanche', 'polygon')
const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY,
  "binance-testnet" // configure this to your network
);

async function main() {
  console.log(
    Math.round(expandDecimals(1, 28), 2) == 10000000000000000000000000000
  );

  console.log(
    Math.round(expandDecimals(10, 30), 2) == 10000000000000000000000000000000
  );

  console.log(toUsd(2) == 2000000000000000000000000000000);

  console.log(
    ethers.constants.AddressZero == 0x0000000000000000000000000000000000000000
  );
}

main();
