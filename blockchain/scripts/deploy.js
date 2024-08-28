const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    // Log ethers object to verify it's loaded correctly
    console.log("Ethers object: ", ethers);

    // Get the deployer's account and balance
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Deploy KreativeToken
    const KreativeToken = await ethers.getContractFactory("KreativeToken");
    const kreativeToken = await KreativeToken.deploy(deployer.address);

    // Wait for the contract to be deployed
    await kreativeToken.deployed();
    console.log("KreativeToken address:", kreativeToken.address);

    // Save the KreativeToken contract address to the .env file
    fs.appendFileSync('.env', `REACT_APP_KREATIVE_TOKEN_ADDRESS=${kreativeToken.address}\n`, { flag: 'a' });
    console.log("KreativeToken address saved to .env file");

    // Deploy CrowdfundingFactory
    const CrowdfundingFactory = await ethers.getContractFactory("CrowdfundingFactory");
    const crowdfundingFactory = await CrowdfundingFactory.deploy(kreativeToken.address);

    // Wait for the contract to be deployed
    await crowdfundingFactory.deployed();
    console.log("CrowdfundingFactory address:", crowdfundingFactory.address);

    // Save the CrowdfundingFactory contract address to the .env file
    fs.appendFileSync('.env', `REACT_APP_CROWDFUNDING_FACTORY_ADDRESS=${crowdfundingFactory.address}\n`, { flag: 'a' });
    console.log("CrowdfundingFactory address saved to .env file");

    // Deploy CrowdfundingCampaign (if needed)
    // const CrowdfundingCampaign = await ethers.getContractFactory("CrowdfundingCampaign");
    // const crowdfundingCampaign = await CrowdfundingCampaign.deploy(/* constructor args */);
    // await crowdfundingCampaign.deployed();
    // console.log("CrowdfundingCampaign address:", crowdfundingCampaign.address);
    // fs.appendFileSync('.env', `REACT_APP_CROWDFUNDING_CAMPAIGN_ADDRESS=${crowdfundingCampaign.address}\n`, { flag: 'a' });
    // console.log("CrowdfundingCampaign address saved to .env file");
}

// Error handling
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying contracts:", error);
        process.exit(1);
    });