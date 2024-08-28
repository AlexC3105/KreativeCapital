// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CrowdfundingFactory is Ownable, ReentrancyGuard {
    struct Campaign {
        address payable creator;
        string name;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        bool active;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(string => uint256) public campaignIdsByName;
    uint256 public campaignCount;
    IERC20 public kreativeToken;
    uint256 public feePercentage = 1; // 1% fee
    uint256 public totalFees;

    event CampaignCreated(
        uint256 indexed campaignId,
        string name,
        address creator,
        uint256 goal,
        uint256 deadline
    );
    event ContributionMade(
        uint256 indexed campaignId,
        address contributor,
        uint256 amount
    );
    event CampaignSuccessful(uint256 indexed campaignId);
    event CampaignFailed(uint256 indexed campaignId);

    constructor(address _kreativeTokenAddress) Ownable(msg.sender) {
        kreativeToken = IERC20(_kreativeTokenAddress);
    }

    function createCampaign(
        string memory _name,
        uint256 _goal,
        uint256 _days,
        uint256 _hours,
        uint256 _minutes
    ) external {
        require(_goal > 0, "Goal must be greater than zero");
        require(
            (campaignIdsByName[_name] == 0 && campaignCount == 0) ||
                campaignIdsByName[_name] != campaignCount,
            "Campaign with this name already exists"
        );

        uint256 deadline = block.timestamp +
            (_days * 1 days) +
            (_hours * 1 hours) +
            (_minutes * 1 minutes);
        campaigns[campaignCount] = Campaign({
            creator: payable(msg.sender),
            name: _name,
            goal: _goal,
            raised: 0,
            deadline: deadline,
            active: true
        });

        campaignIdsByName[_name] = campaignCount;

        emit CampaignCreated(campaignCount, _name, msg.sender, _goal, deadline);
        campaignCount++;
    }

    function contribute(
        string memory _name,
        uint256 _amount
    ) external nonReentrant {
        uint256 _campaignId = campaignIdsByName[_name];
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(campaign.active, "Campaign is no longer active");

        uint256 fee = (_amount * feePercentage) / 100;
        uint256 amountAfterFee = _amount - fee;

        require(
            kreativeToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        campaign.raised += amountAfterFee;
        totalFees += fee;

        emit ContributionMade(_campaignId, msg.sender, _amount);

        if (campaign.raised >= campaign.goal) {
            campaign.active = false;
            kreativeToken.transfer(campaign.creator, campaign.raised);
            emit CampaignSuccessful(_campaignId);
        }
    }

    function withdrawFees() external onlyOwner nonReentrant {
        kreativeToken.transfer(owner(), totalFees);
        totalFees = 0;
    }

    function checkCampaignStatus(string memory _name) external {
        uint256 _campaignId = campaignIdsByName[_name];
        Campaign storage campaign = campaigns[_campaignId];
        require(
            block.timestamp >= campaign.deadline,
            "Campaign is still ongoing"
        );

        if (campaign.raised < campaign.goal) {
            campaign.active = false;
            emit CampaignFailed(_campaignId);
        }
    }

    function getCampaignIdByName(
        string memory _name
    ) external view returns (uint256) {
        return campaignIdsByName[_name];
    }
}
