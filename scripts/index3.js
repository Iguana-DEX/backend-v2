require("dotenv").config();
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const ethers = require("ethers");

// Instantiate the SDK. All major chains and testnets are supported
// ('binance', 'binance-testnet', 'mainnet', 'goerli', 'optimism', 'arbitrum', 'avalanche', 'polygon')
const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY,
  "binance-testnet" // configure this to your network
);

// Dewhales.capital PrivateRounds on BSC Testnet
const tokenContractAddress = "0x0A272B2049358AAC2F48357CADe94ba0f2a607F8";

async function main() {
  // Access token contract
  const contract = await sdk.getContract(tokenContractAddress);

  const isMember = await contract.call(
    "hasRole",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x712F493C6AdBFaC93bDCE6b83E1C2b48761ACA6F"
  );

  const walletAddress = await sdk.wallet.getAddress();

  console.log(walletAddress + " isMember?: " + isMember);
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
