export const connectButton = document.querySelector('#connect-mm');

export async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
  } else {
    alert('Wallet connect failed. Please install Metamask.');
  }
}

connectButton.addEventListener('click', connect);
