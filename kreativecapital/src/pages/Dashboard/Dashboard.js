import React, { useState } from 'react';
import './Dashboard.css';
import Web3 from 'web3';
import CrowdfundingCampaign from '../../abi/CrowdfundingCampaign.json';

const Dashboard = () => {
  const [campaignAddress, setCampaignAddress] = useState('');
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [web3] = useState(new Web3(process.env.REACT_APP_GANACHE_RPC_URL));

  const handleInputChange = (e) => {
    setCampaignAddress(e.target.value);
  };

  const handleCheckStatus = async () => {
    try {
      if (!campaignAddress) {
        console.error("Campaign address is not provided.");
        return;
      }

      // Verify if the input is a valid Ethereum address
      if (!web3.utils.isAddress(campaignAddress)) {
        console.error("Invalid campaign address provided.");
        alert("Invalid campaign address. Please enter a valid Ethereum address.");
        return;
      }

      const campaignContract = new web3.eth.Contract(CrowdfundingCampaign.abi, campaignAddress);

      // Fetch the campaign details using the correct method names from the ABI
      const goalAmount = BigInt(await campaignContract.methods.goalAmount().call());
      const totalContributed = BigInt(await campaignContract.methods.totalContributed().call());
      const deadline = Number(await campaignContract.methods.deadline().call()); // Ensure deadline is a Number

      // Calculate remaining time
      const currentTime = Math.floor(Date.now() / 1000);
      const secondsLeft = deadline - currentTime;

      const daysLeft = Math.floor(secondsLeft / 86400);
      const hoursLeft = Math.floor((secondsLeft % 86400) / 3600);
      const minutesLeft = Math.floor((secondsLeft % 3600) / 60);

      const fetchedCampaignDetails = {
        name: "Campaign Name", // Placeholder for campaign name
        description: "Campaign Description", // Placeholder for campaign description
        fundingGoal: Number(goalAmount) / 1e18, // Convert from BigInt to Number and then from Wei to Ether
        daysLeft: daysLeft,
        hoursLeft: hoursLeft,
        minutesLeft: minutesLeft,
        amountRaised: Number(totalContributed) / 1e18, // Convert from BigInt to Number and then from Wei to Ether
      };

      setCampaignDetails(fetchedCampaignDetails);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      alert("Failed to fetch campaign data. Please check the campaign address and try again.");
    }
  };

  const isCheckButtonActive = campaignAddress.trim() !== '';

  return (
    <div className="dashboard-container">
      <h2>Campaign Dashboard</h2>
      <input
        type="text"
        value={campaignAddress}
        onChange={handleInputChange}
        placeholder="Enter Campaign Contract Address"
      />
      <button
        className={`check-button ${isCheckButtonActive ? 'active' : ''}`}
        onClick={handleCheckStatus}
        disabled={!isCheckButtonActive}
      >
        Check Campaign Status
      </button>

      {campaignDetails && (
        <div className="campaign-details">
          <h3>{campaignDetails.name}</h3>
          <p>{campaignDetails.description}</p>
          <div className="calendar-style">Days Left: {campaignDetails.daysLeft}</div>
          <div className="digital-clock-style">
            {`${campaignDetails.hoursLeft} Hours : ${campaignDetails.minutesLeft} Minutes`}
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${(campaignDetails.amountRaised / campaignDetails.fundingGoal) * 100}%`, backgroundColor: (campaignDetails.amountRaised / campaignDetails.fundingGoal) >= 1 ? '#48ff00' : '#ff0000' }}
            >
              {(campaignDetails.amountRaised / campaignDetails.fundingGoal) * 100}%
            </div>
          </div>
          <button
            className={`withdraw-button ${(campaignDetails.amountRaised / campaignDetails.fundingGoal) >= 1 ? 'active' : ''}`}
            disabled={(campaignDetails.amountRaised / campaignDetails.fundingGoal) < 1}
          >
            Withdraw Funds
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;