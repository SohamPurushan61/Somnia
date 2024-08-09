import { useContext } from 'react';
import Web3Context from './createWeb3Context'; // Adjust the path as necessary

const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
};

export default useWeb3Context;