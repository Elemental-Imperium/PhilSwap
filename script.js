import { ethers } from 'ethers';

// MetaMask Login
document.getElementById('loginButton').addEventListener('click', async () => {
  if (!window.ethereum) {
    alert('MetaMask is not installed!');
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById('walletAddress').innerText = address;
    document.getElementById('walletInfo').style.display = 'block';
  } catch (err) {
    console.error(err);
    alert('Connection failed!');
  }
});