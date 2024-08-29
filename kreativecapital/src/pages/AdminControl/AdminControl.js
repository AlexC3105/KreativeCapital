import React, { useState, useEffect } from 'react';
import { JsonRpcProvider, Contract, parseUnits, formatUnits } from 'ethers';
import './AdminControl.css';

const AdminControl = ({ contractAddress, abi, providerUrl }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');

  const correctPinHash = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'; // Hashed value of "1234"

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        if (!providerUrl) {
          throw new Error('Provider URL is not defined.');
        }

        const provider = new JsonRpcProvider(providerUrl);

        // Load accounts from .env
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
        ].filter(Boolean); // Filter out any undefined or null values

        console.log('Loaded Accounts from .env:', accountsFromEnv);

        if (accountsFromEnv.length === 0) {
          throw new Error('No accounts loaded from .env file.');
        }

        setAccounts(accountsFromEnv);
        setSelectedAccount(accountsFromEnv[0]);

        if (!contractAddress) {
          throw new Error('Contract address is not defined.');
        }

        const signer = provider.getSigner(accountsFromEnv[0]);
        const contractInstance = new Contract(contractAddress, abi, signer);

        setContract(contractInstance);
      } catch (error) {
        console.error('Failed to load accounts or contract:', error.message);
      }
    };

    loadAccounts();
  }, [providerUrl, contractAddress, abi]);

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const hashPin = async (inputPin) => {
    const msgUint8 = new TextEncoder().encode(inputPin); // Encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // Hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string
    return hashHex;
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    const hashedPin = await hashPin(pin);
    if (hashedPin === correctPinHash) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect PIN');
      setPin('');
    }
  };

  const handleMintTokens = async () => {
    if (!selectedAccount || !mintAmount || !contract) return;
    try {
      setTransactionStatus('Minting in progress...');
      const tx = await contract.mint(selectedAccount, parseUnits(mintAmount.toString(), 18));
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
      setTokenBalance(formatUnits(balance, 18));
    } catch (error) {
      setTransactionStatus(`Failed to fetch balance: ${error.message}`);
    }
  };

  return (
    <div className="admin-control-container">
      {!isAuthenticated ? (
        <div className="pin-input-container">
          <h2>Enter PIN</h2>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              placeholder="Enter PIN"
              maxLength="6"
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      ) : (
        <>
          <h2>Admin Control Panel</h2>

          <div className="account-selector">
            <label>Select Account:</label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {accounts.length > 0 ? (
                accounts.map((account, index) => (
                  <option key={index} value={account}>
                    {account}
                  </option>
                ))
              ) : (
                <option>No accounts available</option>
              )}
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
        </>
      )}
    </div>
  );
};

export default AdminControl;