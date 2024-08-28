import React, { useState } from 'react';
import './Dashboard.css';
import Web3 from 'web3';
import CrowdfundingCampaign from '../../abi/CrowdfundingCampaign.json';

const Dashboard = () => {
  const [campaignId, setCampaignId] = useState('');
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [web3] = useState(new Web3(process.env.REACT_APP_GANACHE_RPC_URL));

  const handleInputChange = (e) => {
    setCampaignId(e.target.value);
  };

  const handleCheckStatus = async () => {
    try {
      if (!campaignId) {
        console.error("Campaign ID is not provided.");
        return;
      }

      const campaignContract = new web3.eth.Contract(CrowdfundingCampaign.abi, campaignId);

      // Fetch the campaign details using the correct method names from the ABI
      const goalAmount = await campaignContract.methods.goalAmount().call();
      const totalContributed = await campaignContract.methods.totalContributed().call();
      const deadline = await campaignContract.methods.deadline().call();

      // Calculate remaining time
      const currentTime = Math.floor(Date.now() / 1000);
      const secondsLeft = deadline - currentTime;

      const daysLeft = Math.floor(secondsLeft / 86400);
      const hoursLeft = Math.floor((secondsLeft % 86400) / 3600);
      const minutesLeft = Math.floor((secondsLeft % 3600) / 60);

      const fetchedCampaignDetails = {
        name: "Campaign Name", // Assuming you want to add the campaign name from somewhere
        description: "Campaign Description", // Assuming you want to add the description from somewhere
        fundingGoal: goalAmount / 1e18, // Convert from Wei to Ether
        daysLeft: daysLeft,
        hoursLeft: hoursLeft,
        minutesLeft: minutesLeft,
        amountRaised: totalContributed / 1e18, // Convert from Wei to Ether
      };

      setCampaignDetails(fetchedCampaignDetails);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      alert("Failed to fetch campaign data. Please check the campaign ID and try again.");
    }
  };

  const isCheckButtonActive = campaignId.trim() !== '';

  return (
    <div className="dashboard-container">
      <h2>Campaign Dashboard</h2>
      <input
        type="text"
        value={campaignId}
        onChange={handleInputChange}
        placeholder="Enter Campaign ID"
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
              style={{ width: `${campaignDetails.amountRaised}%`, backgroundColor: campaignDetails.amountRaised >= 100 ? '#48ff00' : '#ff0000' }}
            >
              {campaignDetails.amountRaised}%
            </div>
          </div>
          <button
            className={`withdraw-button ${campaignDetails.amountRaised >= 100 ? 'active' : ''}`}
            disabled={campaignDetails.amountRaised < 100}
          >
            Withdraw Funds
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;