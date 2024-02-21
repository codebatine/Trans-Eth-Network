import { connectButton } from './mm.js';

const rpc = new Web3(
  'https://sepolia.infura.io/v3/2999cf23bc434ab386914374420e3f17',
);
let account;

const elements = {
  accountInput: document.querySelector('#account'),
  checkBalanceButton: document.querySelector('#checkBalance'),
  displayBalance: document.querySelector('#balance'),
  displayBlockNumber: document.querySelector('#blockNumber'),
  toAccountInput: document.querySelector('#toAccount'),
  valueInput: document.querySelector('#amount'),
  sendButton: document.querySelector('#sendTrx'),
  transactionList: document.querySelector('#transactions'),
};

async function checkBalance() {
  account = elements.accountInput.value;
  const balance = await rpc.eth.getBalance(account);
  elements.displayBalance.textContent = rpc.utils.fromWei(balance, 'ether');
  const blockNumber = await rpc.eth.getBlockNumber();
  elements.displayBlockNumber.textContent = `Block number: ${blockNumber}`;
}

function createTransactionList(transaction) {
  const transactionDiv = document.createElement('div');
  transactionDiv.classList.add('transaction');
  const fields = ['from', 'to', 'value', 'gas', 'gasPrice'];
  fields.forEach((field) => {
    const div = document.createElement('div');
    div.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
      field === 'value'
        ? `${rpc.utils.fromWei(transaction[field], 'ether')} ETH`
        : transaction[field]
    }`;
    transactionDiv.appendChild(div);
  });
  elements.transactionList.appendChild(transactionDiv);
}

async function sendTransaction() {
  const toAddress = elements.toAccountInput.value;
  const amount = parseFloat(elements.valueInput.value) * Math.pow(10, 18);
  try {
    const params = [
      {
        from: account,
        to: toAddress,
        value: Number(amount).toString(16),
      },
    ];
    const transactionHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params,
    });
    const transaction = await rpc.eth.getTransaction(transactionHash);
    displayTransaction(transaction);
  } catch (error) {
    console.log(error);
  }
}

function displayTransaction(transaction) {
  elements.transactionList.textContent = '';
  createTransactionList(transaction);
}

document.addEventListener('DOMContentLoaded', () => {
  elements.checkBalanceButton.addEventListener('click', checkBalance);
  elements.sendButton.addEventListener('click', sendTransaction);
});
