require("dotenv").config();
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const ethers = require("ethers");

// Instantiate the SDK. All major chains and testnets are supported
// ('binance', 'binance-testnet', 'mainnet', 'goerli', 'optimism', 'arbitrum', 'avalanche', 'polygon')
const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY,
  "sepolia" // configure this to your network
);

// AVAX token on BSC Testnet
const tokenContractAddress = "0x505e70b340Dec3a3bd17D5e8B8d7B898aC608e47";

async function main() {
  // Access token contract
  const contract = await sdk.getContract(tokenContractAddress);
  const tokenDecimals = await contract.call("decimals");

  const nativeAssetBalance = await sdk.wallet.balance();
  const walletAddress = await sdk.wallet.getAddress();

  console.log(typeof DecimalPrecision);

  // NATIVE ASSET EXAMPLE
  console.log(
    nativeAssetBalance.symbol +
      " balance: " +
      DecimalPrecision.round(nativeAssetBalance.displayValue, 2)
  );
  console.log("walletAddress: " + walletAddress);

  // Transfer 1 AVAX to nico-test
  sdk.wallet.transfer(
    "0x712F493C6AdBFaC93bDCE6b83E1C2b48761ACA6F",
    "1",
    tokenContractAddress
  );

  console.log(typeof tokenDecimals);

  await contract.call(
    "transfer",
    "0x712F493C6AdBFaC93bDCE6b83E1C2b48761ACA6F",
    (1 * Math.pow(10, tokenDecimals)).toString()
  );

  // Read totalSupply using direct call to avax token contract
  const tokenTotalSupply = await contract.call("totalSupply");

  console.log(
    "avaxTotalSupply: " +
      DecimalPrecision.round(tokenTotalSupply / Math.pow(10, tokenDecimals), 2)
  );

  // Fetch balance of our own wallet using direct call to avax token contract
  const tokenSymbol = await contract.call("symbol");
  const tokenBalance = await contract.call("balanceOf", walletAddress);

  console.log(
    tokenSymbol +
      " balance: " +
      DecimalPrecision.round(tokenBalance / Math.pow(10, tokenDecimals), 2)
  );

  const erc20Balance = await contract.erc20.balance();
  const erc20Balance2 = await sdk.wallet.balance(tokenContractAddress);

  console.log(
    erc20Balance.symbol +
      " balance: " +
      DecimalPrecision.round(erc20Balance.displayValue, 2)
  );
  console.log(
    erc20Balance2.symbol +
      " balance: " +
      DecimalPrecision.round(erc20Balance2.displayValue, 2)
  );

  const nicoTestBalance = await contract.erc20.balanceOf(
    "0x712F493C6AdBFaC93bDCE6b83E1C2b48761ACA6F"
  );

  console.log(
    "nico-test " +
      nicoTestBalance.symbol +
      " balance: " +
      DecimalPrecision.round(nicoTestBalance.displayValue, 2)
  );
}

main();

// HELPER FUNCTION
var DecimalPrecision = (function () {
  if (Number.EPSILON === undefined) {
    Number.EPSILON = Math.pow(2, -52);
  }
  if (Math.sign === undefined) {
    Math.sign = function (x) {
      return (x > 0) - (x < 0) || +x;
    };
  }
  return {
    // Decimal round (half away from zero)
    round: function (num, decimalPlaces) {
      var p = Math.pow(10, decimalPlaces || 0);
      var n = num * p * (1 + Number.EPSILON);
      return Math.round(n) / p;
    },
    // Decimal ceil
    ceil: function (num, decimalPlaces) {
      var p = Math.pow(10, decimalPlaces || 0);
      var n = num * p * (1 - Math.sign(num) * Number.EPSILON);
      return Math.ceil(n) / p;
    },
    // Decimal floor
    floor: function (num, decimalPlaces) {
      var p = Math.pow(10, decimalPlaces || 0);
      var n = num * p * (1 + Math.sign(num) * Number.EPSILON);
      return Math.floor(n) / p;
    },
    // Decimal trunc
    trunc: function (num, decimalPlaces) {
      return (num < 0 ? this.ceil : this.floor)(num, decimalPlaces);
    },
    // Format using fixed-point notation
    toFixed: function (num, decimalPlaces) {
      return this.round(num, decimalPlaces).toFixed(decimalPlaces);
    },
  };
})();
