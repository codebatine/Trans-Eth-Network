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

/// 0xA0127d4E11078e180675865B93Ff5C3478318B3d
