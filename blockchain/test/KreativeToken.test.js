require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_GANACHE_RPC_URL);
const wallet = new ethers.Wallet(process.env.GANACHE_PRIVATE_KEY_1, provider);

// Load the contract's ABI and Bytecode
const contractPath = path.resolve(__dirname, '../blockchain/contracts/KreativeToken.sol');
const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

async function main() {
    // Deploy the contract
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.deployed();

    console.log(`KreativeToken deployed at: ${contract.address}`);

    // Interact with the contract
    const totalSupply = await contract.totalSupply();
    console.log(`Total supply of KreativeToken is: ${totalSupply.toString()}`);

    // Additional interactions as needed
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });