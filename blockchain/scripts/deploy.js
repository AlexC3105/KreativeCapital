const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Deployer object:", deployer); // Log the deployer object for debugging

    // Fetch the balance of the deployer
    try {
        const balance = await deployer.provider.getBalance(deployer.address);
        console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");
    } catch (error) {
        console.error("Error fetching balance:", error);
    }

    // Deploy KreativeToken contract
    const KreativeToken = await ethers.getContractFactory("KreativeToken");
    const kreativeToken = await KreativeToken.deploy();

    await kreativeToken.waitForDeployment();
    console.log("KreativeToken address:", await kreativeToken.getAddress());

    // Save the KreativeToken contract address to the .env file
    fs.appendFileSync('.env', `REACT_APP_KREATIVE_TOKEN_ADDRESS=${await kreativeToken.getAddress()}\n`);
    console.log("KreativeToken address saved to .env file");

    // Deploy CrowdfundingFactory contract
    const CrowdfundingFactory = await ethers.getContractFactory("CrowdfundingFactory");
    const crowdfundingFactory = await CrowdfundingFactory.deploy(await kreativeToken.getAddress());

    await crowdfundingFactory.waitForDeployment();
    console.log("CrowdfundingFactory address:", await crowdfundingFactory.getAddress());

    // Save the CrowdfundingFactory contract address to the .env file
    fs.appendFileSync('.env', `REACT_APP_CROWDFUNDING_FACTORY_ADDRESS=${await crowdfundingFactory.getAddress()}\n`);
    console.log("CrowdfundingFactory address saved to .env file");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error deploying contracts:", error);
        process.exit(1);
    });