const { ethers } = require('ethers');

// Load environment variables
require('dotenv').config();

// Define the Ganache provider
const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GANACHE_RPC_URL);

// List of account addresses to check
const accounts = [
    process.env.REACT_APP_GANACHE_ADDRESS_1,
    process.env.REACT_APP_GANACHE_ADDRESS_2,
    process.env.REACT_APP_GANACHE_ADDRESS_3,
    process.env.REACT_APP_GANACHE_ADDRESS_4,
    process.env.REACT_APP_GANACHE_ADDRESS_5,
    process.env.REACT_APP_GANACHE_ADDRESS_6,
    process.env.REACT_APP_GANACHE_ADDRESS_7,
    process.env.REACT_APP_GANACHE_ADDRESS_8,
    process.env.REACT_APP_GANACHE_ADDRESS_9,
    process.env.REACT_APP_GANACHE_ADDRESS_10,
].filter(account => account); // Filter out any undefined accounts

async function checkConnection() {
    try {
        // Check the network ID
        const network = await provider.getNetwork();
        console.log(`Connected to network ID: ${network.chainId}, name: ${network.name}`);

        // Check the block number to ensure the connection is active
        const blockNumber = await provider.getBlockNumber();
        console.log(`Current block number: ${blockNumber}`);

        // Pull the balances for each account
        for (const account of accounts) {
            const balance = await provider.getBalance(account);
            console.log(`Balance of ${account}: ${ethers.utils.formatEther(balance)} ETH`);
        }
    } catch (error) {
        console.error('Error connecting to Ganache:', error);
    }
}

// Run the connection check
checkConnection();