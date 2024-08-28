require('dotenv').config();
const { ethers } = require("ethers");

async function main() {
    // Connect to Ganache using JsonRpcProvider
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

    const accounts = [
        process.env.GANACHE_PRIVATE_KEY_1,
        process.env.GANACHE_PRIVATE_KEY_2,
        process.env.GANACHE_PRIVATE_KEY_3,
        process.env.GANACHE_PRIVATE_KEY_4,
        process.env.GANACHE_PRIVATE_KEY_5,
        process.env.GANACHE_PRIVATE_KEY_6,
        process.env.GANACHE_PRIVATE_KEY_7,
        process.env.GANACHE_PRIVATE_KEY_8,
        process.env.GANACHE_PRIVATE_KEY_9,
        process.env.GANACHE_PRIVATE_KEY_10
    ];

    for (let i = 0; i < accounts.length; i++) {
        const wallet = new ethers.Wallet(accounts[i], provider);
        const balance = await wallet.getBalance();
        console.log(`Balance for account ${i + 1}: ${ethers.utils.formatEther(balance)} ETH`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});