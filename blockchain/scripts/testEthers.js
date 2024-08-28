const { ethers } = require("hardhat");

async function main() {
    console.log("Ethers object: ", ethers);

    const [deployer] = await ethers.getSigners();
    console.log("Deployer address: ", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
