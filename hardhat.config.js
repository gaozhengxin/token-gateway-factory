require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    hardhat: {
    },
    eth: {
      url: process.env.ETH_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrum: {
      url: process.env.ARB_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    optimism: {
      url: process.env.OP_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    polygon: {
      url: process.env.POLYGON_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    fantom: {
      url: process.env.FANTOM_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    avax: {
      url: process.env.AVAX_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    bsc: {
      url: process.env.BSC_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    },
    xana: {
      url: process.env.XANA_RPC_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: { polygon: process.env.POLYGONSCAN_API_KEY }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
