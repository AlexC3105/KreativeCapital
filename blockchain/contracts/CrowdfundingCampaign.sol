// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CrowdfundingCampaign is ReentrancyGuard {
    address public campaignOwner;
    uint256 public goalAmount;
    uint256 public totalContributed;
    uint256 public deadline;

    mapping(address => uint256) public contributions;

    event ContributionMade(address contributor, uint256 amount);
    event FundsWithdrawn(address owner, uint256 amount);
    event RefundIssued(address contributor, uint256 amount);

    constructor(uint256 _goalAmount, uint256 _duration) {
        campaignOwner = msg.sender;
        goalAmount = _goalAmount;
        deadline = block.timestamp + _duration;
    }

    function contribute() external payable nonReentrant {
        require(block.timestamp < deadline, "Campaign has ended");
        contributions[msg.sender] += msg.value;
        totalContributed += msg.value;
        emit ContributionMade(msg.sender, msg.value);
    }

    function checkGoalReached() public view returns (bool) {
        return totalContributed >= goalAmount;
    }

    function withdrawFunds() external nonReentrant {
        require(
            msg.sender == campaignOwner,
            "Only the campaign owner can withdraw funds"
        );
        require(block.timestamp >= deadline, "Campaign is still active");
        require(checkGoalReached(), "Goal not reached");

        uint256 balance = address(this).balance;
        payable(campaignOwner).transfer(balance);
        emit FundsWithdrawn(campaignOwner, balance);
    }

    function refund() external nonReentrant {
        require(block.timestamp >= deadline, "Campaign is still active");
        require(
            !checkGoalReached(),
            "Goal was reached, refunds are not possible"
        );

        uint256 contributedAmount = contributions[msg.sender];
        require(
            contributedAmount > 0,
            "No contributions found for this address"
        );

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(contributedAmount);
        emit RefundIssued(msg.sender, contributedAmount);
    }
}
