import React, { useState, useEffect } from 'react';
import { JsonRpcProvider, Contract, ethers } from 'ethers';
import './AdminControl.css';

const AdminControl = ({ contractAddress, abi, providerUrl }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');

  useEffect(() => {
    const loadAccounts = async () => {
      const provider = new JsonRpcProvider(providerUrl);
      const accountsList = await provider.listAccounts();
      setAccounts(accountsList);
      setSelectedAccount(accountsList[0]);

      const contractInstance = new Contract(contractAddress, abi, provider.getSigner(accountsList[0]));
      setContract(contractInstance);
    };

    loadAccounts();
  }, [providerUrl, contractAddress, abi]);

  const handleMintTokens = async () => {
    if (!selectedAccount || !mintAmount || !contract) return;
    try {
      setTransactionStatus('Minting in progress...');
      const tx = await contract.mint(selectedAccount, ethers.utils.parseUnits(mintAmount.toString(), 18));
      await tx.wait();
      setTransactionStatus('Minting successful!');
    } catch (error) {
      setTransactionStatus(`Minting failed: ${error.message}`);
    }
  };

  const fetchTokenBalance = async () => {
    if (!selectedAccount || !contract) return;
    try {
      const balance = await contract.balanceOf(selectedAccount);
      setTokenBalance(ethers.utils.formatUnits(balance, 18));
    } catch (error) {
      setTransactionStatus(`Failed to fetch balance: ${error.message}`);
    }
  };

  return (
    <div className="admin-control-container">
      <h2>Admin Control Panel</h2>

      <div className="account-selector">
        <label>Select Account:</label>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {accounts.map((account, index) => (
            <option key={index} value={account}>
              {account}
            </option>
          ))}
        </select>
      </div>

      <div className="mint-tokens">
        <h3>Mint Tokens</h3>
        <input
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          placeholder="Amount to mint"
        />
        <button onClick={handleMintTokens} disabled={!mintAmount}>
          Mint Tokens
        </button>
      </div>

      <div className="token-balance">
        <h3>Token Balance</h3>
        <button onClick={fetchTokenBalance}>Fetch Balance</button>
        {tokenBalance && <p>{tokenBalance} KT</p>}
      </div>

      {transactionStatus && <p className="transaction-status">{transactionStatus}</p>}
    </div>
  );
};

export default AdminControl;