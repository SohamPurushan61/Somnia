import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useWeb3Context from '../contexts/useWeb3Context';
import { ethers } from 'ethers';
import { Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { connectWallet, signMessage, authenticate } from '../support/authService';


const ConnectionPage = () => {

  const{ updateWeb3State } = useWeb3Context();
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState(null);
  const navigate = useNavigate(); 

  const connectToMetaMask = async () => {
    const userAccount = await connectWallet();
    if (userAccount) {
      const { account, signature } = await signMessage(userAccount);
    if (account && signature) {
      const token = await authenticate(account, signature);
      if (token) {
        localStorage.setItem('authToken', token);
        setAccount(account);
        updateWeb3State({ selectedAccount: account });
        navigate('/home');
      }
    }
  }

};


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: 'center' }}>
      <h4 style={{ marginBottom: '20px' }}>Welcome to Somnia</h4>
      <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} onClick={connectToMetaMask}>
        Login with MetaMask
      </button>
    </div>
  );
};

export default ConnectionPage;