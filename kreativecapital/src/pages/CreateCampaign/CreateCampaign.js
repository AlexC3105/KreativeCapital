import React, { useState, useEffect } from 'react';
import './CreateCampaign.css';
import Web3 from 'web3';
import CrowdfundingCampaign from '../../abi/CrowdfundingCampaign.json';

const CreateCampaign = ({ onNewCampaign }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    goal: '',
    days: '0',
    hours: '0',
    minutes: '0',
    selectedAccount: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      const web3Instance = new Web3(process.env.REACT_APP_GANACHE_RPC_URL);
      setWeb3(web3Instance);

      const accountsFromEnv = [
        process.env.REACT_APP_GANACHE_ADDRESS_1,
        process.env.REACT_APP_GANACHE_ADDRESS_2,
        process.env.REACT_APP_GANACHE_ADDRESS_3,
        process.env.REACT_APP_GANACHE_ADDRESS_4,
        process.env.REACT_APP_GANACHE_ADDRESS_5,
        process.env.REACT_APP_GANACHE_ADDRESS_6,
        process.env.REACT_APP_GANACHE_ADDRESS_7,
        process.env.REACT_APP_GANACHE_ADDRESS_8,
        process.env.REACT_APP_GANACHE_ADDRESS_9,
        process.env.REACT_APP_GANACHE_ADDRESS_10,
      ].filter(account => account);

      console.log('Loaded accounts:', accountsFromEnv);

      if (accountsFromEnv.length > 0) {
        setAccounts(accountsFromEnv);
        setForm((prevForm) => ({
          ...prevForm,
          selectedAccount: accountsFromEnv[0],
        }));
      } else {
        console.error('No accounts were loaded. Please check your .env file.');
      }
    };
    loadWeb3();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    validateForm({ ...form, [name]: value });
  };

  const validateForm = (updatedForm) => {
    if (
      updatedForm.name &&
      updatedForm.description &&
      updatedForm.goal &&
      updatedForm.minutes !== '0' &&
      updatedForm.selectedAccount
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const goalInWei = web3.utils.toWei((form.goal / 100).toString(), 'ether');
      const durationInSeconds = parseInt(form.days) * 86400 + parseInt(form.hours) * 3600 + parseInt(form.minutes) * 60;

      const deployedContract = await new web3.eth.Contract(CrowdfundingCampaign.abi)
        .deploy({
          data: CrowdfundingCampaign.bytecode,
          arguments: [goalInWei, durationInSeconds],
        })
        .send({ from: form.selectedAccount, gas: 3000000 });

      const newCampaign = {
        name: form.name,
        description: form.description,
        goal: `${form.goal} KT`,
        percentage: '0% Funded',
        timeLeft: `${form.days} Days ${form.hours} Hours ${form.minutes} Minutes`,
        contractAddress: deployedContract.options.address,
      };

      setModalMessage(`Campaign created successfully! Contract Address: ${newCampaign.contractAddress}`);
      setShowModal(true);

      if (typeof onNewCampaign === 'function') {
        console.log("onNewCampaign is being called");
        onNewCampaign(newCampaign); // Pass the new campaign to the parent component
      } else {
        console.error("onNewCampaign is not a function");
      }

    } catch (error) {
      setModalMessage("Failed to create campaign. Please try again.");
      setShowModal(true);
      console.error("Error deploying contract:", error);
    }
  };

  return (
    <div className="create-campaign-container">
      <h1>Create a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="selectedAccount"
          value={form.selectedAccount}
          onChange={handleChange}
        >
          {accounts.map((account, index) => (
            <option key={index} value={account}>
              {account}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Campaign Name"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Campaign Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="goal"
          placeholder="Funding Goal (in KT)"
          value={form.goal}
          onChange={handleChange}
        />
        <div className="time-selectors">
          <select
            name="days"
            value={form.days}
            onChange={handleChange}
          >
            {[...Array(31).keys()].map((day) => (
              <option key={day} value={day}>
                {day} Days
              </option>
            ))}
          </select>
          <select
            name="hours"
            value={form.hours}
            onChange={handleChange}
          >
            {[...Array(25).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour} Hours
              </option>
            ))}
          </select>
          <select
            name="minutes"
            value={form.minutes}
            onChange={handleChange}
          >
            {[...Array(61).keys()].map((minute) => (
              <option key={minute} value={minute}>
                {minute} Minutes
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={!isFormValid}>
          Create Campaign
        </button>
        <p className="warning-message">
          ⓘ Important Note: In the unlikely event your campaign doesn't reach its goal, we ensure a prompt and full refund to all contributors. ⓘ
        </p>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCampaign;