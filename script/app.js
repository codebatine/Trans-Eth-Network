import { connectButton } from './mm.js';

const accountInput = document.querySelector('#account');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const displayBlockNumber = document.querySelector('#blockNumber');

const toAccountInput = document.querySelector('#toAccount');
const valueInput = document.querySelector('#amount');
const sendButton = document.querySelector('#sendTrx');

const transactionList = document.querySelector('#transactions');

const rpc = new Web3(
  'https://sepolia.infura.io/v3/2999cf23bc434ab386914374420e3f17',
);

let account;

function initApp() {}

async function checkBalance() {
  account = accountInput.value;

  const balance = await rpc.eth.getBalance(account);
  displayBalance.textContent = rpc.utils.fromWei(balance, 'ether');

  const blockNumber = await rpc.eth.getBlockNumber();
  displayBlockNumber.textContent = `Block number: ${blockNumber}`;

  const block = await rpc.eth.getBlock('latest');
  if (block !== null && block.transactions !== null) {
    displayHistory(block.transactions);
  }
}

async function displayHistory(transactions) {
  transactionList.textContent = '';
  const recentTransactions = transactions.slice(-3);
  for (let hash of recentTransactions) {
    let trx = await rpc.eth.getTransaction(hash);
    createTransactionList(trx);
  }
}

function createTransactionList(transaction) {
  const transactionDiv = document.createElement('div');
  transactionDiv.classList.add('transaction');

  const fromDiv = document.createElement('div');
  fromDiv.textContent = `From: ${transaction.from}`;
  transactionDiv.appendChild(fromDiv);

  const toDiv = document.createElement('div');
  toDiv.textContent = `To: ${transaction.to}`;
  transactionDiv.appendChild(toDiv);

  const amountDiv = document.createElement('div');
  amountDiv.textContent = `Amount: ${rpc.utils.fromWei(
    transaction.value,
    'ether',
  )} ETH`;
  transactionDiv.appendChild(amountDiv);

  document.getElementById('transactions').appendChild(transactionDiv);
}

async function sendTransaction() {
  const toAddress = toAccountInput.value;
  const amount = parseFloat(valueInput.value) * Math.pow(10, 18);

  try {
    let params = [
      {
        from: account,
        to: toAddress,
        value: Number(amount).toString(16),
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
      },
    ];
    const response = await ethereum.request({
      method: 'eth_sendTransaction',
      params: params,
    });
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);
