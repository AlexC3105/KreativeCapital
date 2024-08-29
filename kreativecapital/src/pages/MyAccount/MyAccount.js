import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './MyAccount.css';
import { ethers, formatEther, parseEther } from 'ethers';  // Import necessary functions directly

import kreativeTokenJSON from '../../abi/KreativeToken.json';
import crowdfundingFactoryABI from '../../abi/CrowdfundingFactory.json';
import crowdfundingCampaignABI from '../../abi/CrowdfundingCampaign.json';

const kreativeTokenABI = kreativeTokenJSON.abi;

const MyAccount = () => {
  const [etherBalance, setEtherBalance] = useState(0);
  const [ktBalance, setKtBalance] = useState(0);
  const [ktSupply, setKtSupply] = useState(0);
  const [etherAmount, setEtherAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const provider = useMemo(() => new ethers.JsonRpcProvider(process.env.REACT_APP_GANACHE_RPC_URL), []);

  const kreativeTokenAddress = process.env.REACT_APP_KREATIVE_TOKEN_ADDRESS;
  const crowdfundingFactoryAddress = process.env.REACT_APP_CROWDFUNDING_FACTORY_ADDRESS;

  const kreativeTokenContract = useMemo(
    () => new ethers.Contract(kreativeTokenAddress, kreativeTokenABI, provider),
    [provider, kreativeTokenAddress]
  );

  const factoryContract = useMemo(
    () => new ethers.Contract(crowdfundingFactoryAddress, crowdfundingFactoryABI.abi, provider),
    [provider, crowdfundingFactoryAddress]
  );

  const loadTokenSupply = useCallback(async () => {
    try {
      const supply = await kreativeTokenContract.totalSupply();
      setKtSupply(parseFloat(formatEther(supply)));
      console.log("KT Supply Loaded:", supply.toString());
    } catch (err) {
      console.error('Failed to load KT token supply:', err);
    }
  }, [kreativeTokenContract]);

  const loadBalances = useCallback(
    async (account) => {
      try {
        const balance = await provider.getBalance(account);
        setEtherBalance(parseFloat(formatEther(balance)));

        const ktBalance = await kreativeTokenContract.balanceOf(account);
        setKtBalance(parseFloat(formatEther(ktBalance)));

        console.log("Balances Loaded for Account:", account);
        console.log("Ether Balance:", formatEther(balance));
        console.log("KT Balance:", formatEther(ktBalance));
      } catch (err) {
        console.error('Failed to load balances:', err);
      }
    },
    [provider, kreativeTokenContract]
  );

  const loadCampaigns = useCallback(
    async (account) => {
      try {
        const campaignCount = await factoryContract.campaignCount();
        console.log("Total Campaigns:", campaignCount.toString());
        const userCampaigns = [];

        for (let i = 0; i < campaignCount; i++) {
          const campaignId = await factoryContract.campaignIdsByName(account);
          const campaignAddress = await factoryContract.campaigns(campaignId);
          const campaignContract = new ethers.Contract(campaignAddress, crowdfundingCampaignABI.abi, provider);

          const isActive = await campaignContract.checkGoalReached();
          const goalAmount = await campaignContract.goalAmount();
          const totalContributed = await campaignContract.totalContributed();

          userCampaigns.push({
            id: campaignId.toString(), // Ensure id is a string
            contractAddress: campaignAddress, // Ensure contractAddress is a string
            goalAmount: formatEther(goalAmount),
            totalContributed: formatEther(totalContributed),
            status: isActive ? 'Active' : 'Inactive',
          });

          console.log("Campaign Loaded:", userCampaigns[i]);
        }

        setCampaigns(userCampaigns);
      } catch (err) {
        console.error('Failed to load campaigns:', err);
      }
    },
    [factoryContract, provider]
  );

  const handleWithdrawFunds = async (campaignAddress) => {
    if (!selectedAccount || !campaignAddress) return;

    try {
      const signer = provider.getSigner(selectedAccount);
      const campaignContract = new ethers.Contract(campaignAddress, crowdfundingCampaignABI.abi, signer);

      const transaction = await campaignContract.withdrawFunds();
      await transaction.wait();

      console.log("Funds Withdrawn from Campaign:", campaignAddress);

      loadCampaigns(selectedAccount); // Reload campaigns after withdrawal
    } catch (err) {
      console.error('Failed to withdraw funds:', err);
    }
  };

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accountsList = await provider.listAccounts();
        console.log("Loaded Accounts:", accountsList);
        setAccounts(accountsList);
        if (accountsList.length > 0) {
          setSelectedAccount(accountsList[0].address || accountsList[0]); // Use the address if it's an object, or the account itself if it's a string
          await loadBalances(accountsList[0].address || accountsList[0]);
          await loadCampaigns(accountsList[0].address || accountsList[0]);
        }
      } catch (err) {
        console.error('Failed to connect to Ganache:', err);
      }
    };

    loadAccounts();
    loadTokenSupply();
  }, [provider, loadBalances, loadCampaigns, loadTokenSupply]);

  const handleBuyKt = async () => {
    if (!selectedAccount || !etherAmount) {
      console.log("No account selected or no ether amount specified.");
      return;
    }
  
    try {
      console.log(`Attempting to buy KT with account: ${selectedAccount} and amount: ${etherAmount} ETH`);
  
      const signer = await provider.getSigner(selectedAccount); // Await the promise to resolve the signer
      if (!signer) {
        console.error("Failed to get signer.");
        return;
      }
      console.log("Signer obtained:", signer);
  
      const connectedContract = kreativeTokenContract.connect(signer);
      console.log("Connected Contract:", connectedContract);
  
      const valueInWei = ethers.parseEther(etherAmount);
      console.log(`Value in Wei: ${valueInWei}`);
  
      const transaction = await connectedContract.buyTokens({ value: valueInWei });
      console.log("Transaction sent:", transaction);
  
      const receipt = await transaction.wait();
      console.log("Transaction mined:", receipt);
  
      console.log("KT Purchased:", etherAmount);
  
      await loadBalances(selectedAccount); // Reload balances after the purchase
      setEtherAmount(''); // Reset the Ether amount input
    } catch (err) {
      console.error('Failed to buy KT:', err);
    }
  };

  return (
    <div className="my-account-container">
      <h2>My Account</h2>

      <div className="balances">
        <div>
          <h3>Total KT Supply</h3>
          <p>{ktSupply} KT</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Ether Balance</h3>
            <p>{etherBalance.toFixed(4)} ETH</p>
          </div>
          <div>
            <h3>KreativeToken Balance</h3>
            <p>{ktBalance} KT</p>
          </div>
        </div>
      </div>

      <div className="buy-tokens">
        <h3>Buy KreativeTokens (KT)</h3>

        <select
          value={selectedAccount}
          onChange={async (e) => {
            setSelectedAccount(e.target.value);
            await loadBalances(e.target.value);
            await loadCampaigns(e.target.value);
          }}
          className="wallet-selector"
        >
          {accounts.map((account, index) => (
            <option key={index} value={account.address || account}>
              {account.address || account}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={etherAmount}
          onChange={(e) => setEtherAmount(e.target.value)}
          placeholder="Enter amount of Ether to convert"
        />
        <button onClick={handleBuyKt} disabled={!etherAmount || !selectedAccount}>
          Buy KT
        </button>
      </div>

      <div className="campaigns">
        <h3>My Campaigns</h3>
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="campaign-card">
              <h4>Campaign ID: {campaign.id}</h4>
              <p>Funding Goal: {campaign.goalAmount} KT</p>
              <p>Funds Raised: {campaign.totalContributed} KT</p>
              <p>Status: {campaign.status}</p>
              <button
                onClick={() => handleWithdrawFunds(campaign.contractAddress)}
                disabled={campaign.status === 'Active'}
              >
                Withdraw Funds
              </button>
            </div>
          ))
        ) : (
          <p>You have not created any campaigns yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;