import {ethers} from 'ethers';
import axios from 'axios';


const url = 'http://localhost:3000/api/auth/authenticate';

export const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        console.log('MetaMask is not installed!');
        return null;
    }

};

export const signMessage = async (account) => {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const message = "Authenticate with Somnia";

    try{
        const signature = await signer.signMessage(message);
        return {account, signature };
    } catch (error) {
        console.error('Error signing message:', error);
        return null;
    }

};

export const authenticate = async (account, signature) => {
    try{
        const response = await axios.post(url, {account, signature});
        return response.data.accessToken;
        
    } catch (error) {
        console.error('Authentication failed:', error);
        return null;

    }
}