require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-chai-matchers');

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
    ],
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache's default RPC server URL
      accounts: [
        process.env.GANACHE_PRIVATE_KEY_1,
        process.env.GANACHE_PRIVATE_KEY_2,
        process.env.GANACHE_PRIVATE_KEY_3,
        process.env.GANACHE_PRIVATE_KEY_4,
        process.env.GANACHE_PRIVATE_KEY_5,
        process.env.GANACHE_PRIVATE_KEY_6,
        process.env.GANACHE_PRIVATE_KEY_7,
        process.env.GANACHE_PRIVATE_KEY_8,
        process.env.GANACHE_PRIVATE_KEY_9,
        process.env.GANACHE_PRIVATE_KEY_10,
      ].filter(Boolean), // Ensure no undefined values are passed
    },
    localhost: {
      url: "http://127.0.0.1:7545", // Match the Ganache port
    },
  },
};