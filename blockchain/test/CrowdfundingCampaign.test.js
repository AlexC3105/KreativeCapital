const { expect } = require("chai");

describe("CrowdfundingCampaign", function () {
    it("Should set the right owner", async function () {
        const [owner] = await ethers.getSigners();
        const CrowdfundingCampaign = await ethers.getContractFactory("CrowdfundingCampaign");
        const campaign = await CrowdfundingCampaign.deploy(ethers.utils.parseEther("10"), 86400);
        await campaign.deployed();

        expect(await campaign.campaignOwner()).to.equal(owner.address);
    });

    it("Should accept contributions", async function () {
        const [owner, contributor] = await ethers.getSigners();
        const CrowdfundingCampaign = await ethers.getContractFactory("CrowdfundingCampaign");
        const campaign = await CrowdfundingCampaign.deploy(ethers.utils.parseEther("10"), 86400);
        await campaign.deployed();

        await campaign.connect(contributor).contribute({ value: ethers.utils.parseEther("1") });

        expect(await campaign.totalContributed()).to.equal(ethers.utils.parseEther("1"));
    });
});