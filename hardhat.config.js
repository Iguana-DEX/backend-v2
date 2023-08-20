require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");

require("@typechain/hardhat");

require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@openzeppelin/hardhat-upgrades");
require("./tasks");

require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.info(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.8.4",
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  namedAccounts: {
    deployer: {
      default: 0, // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },

  mocha: {
    timeout: 100000000,
  },

  networks: {
    localhost: {
      timeout: 120000,
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    bsc: {
      url: process.env.BSC_URL,
      chainId: 56,
      accounts: [process.env.PRIVATE_KEY],
    },
    arbitrumOne: {
      url: process.env.ARBITRUM_URL,
      chainId: 42161,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimisticEthereum: {
      url: process.env.OPTIMISM_URL,
      chainId: 10,
      accounts: [process.env.PRIVATE_KEY],
    },
    avalanche: {
      url: process.env.AVAX_URL,
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: process.env.POLYGON_URL,
      chainId: 137,
      accounts: [process.env.PRIVATE_KEY],
    },
    mantle: {
      url: process.env.MANTLE_URL,
      chainId: 5000,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      chainId: 1,
      accounts: [process.env.PRIVATE_KEY],
    },
    opera: {
      url: process.env.FANTOM_URL,
      chainId: 250,
      accounts: [process.env.PRIVATE_KEY],
    },

    bscTestnet: {
      url: process.env.BSC_TESTNET_URL,
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY],
    },
    arbitrumGoerli: {
      url: process.env.ARBITRUM_TESTNET_URL,
      chainId: 421613,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimisticGoerli: {
      url: process.env.OPTIMISM_TESTNET_URL,
      chainId: 420,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygonMumbai: {
      url: process.env.MUMBAI_URL,
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: process.env.GOERLI_URL,
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY],
    },
    mantleTestnet: {
      url: process.env.MANTLE_TESTNET_URL,
      chainId: 5001,
      accounts: [process.env.PRIVATE_KEY],
    },
    avalancheFujiTestnet: {
      url: process.env.FUJI_URL,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY],
    },
    ftmTestnet: {
      url: process.env.FANTOM_TESTNET_URL,
      chainId: 4002,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      opera: process.env.FTMSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      arbitrumGoerli: process.env.ARBISCAN_API_KEY,
      optimisticGoerli: process.env.OPTIMISM_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      ftmTestnet: process.env.FTMSCAN_API_KEY,
    },
  },

  solidity: {
    compilers: [
      {
        // First 3 compilers are used by LayerZero
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        // In order to run GMX code
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};
