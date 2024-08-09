import React from 'react'
import  useWeb3Context from '../contexts/useWeb3Context'

const HomePage = () => {
    const { web3state } = useWeb3Context();

    return (
        <div>
      <h1>Home Page</h1>
      {web3state.selectedAccount ? (
        <p>Connected account: {web3state.selectedAccount}</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
};
export default HomePage;