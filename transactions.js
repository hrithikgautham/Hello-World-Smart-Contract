
const abi = [{"inputs":[],"name":"getHelloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
const contract_address = "0x85a3618c2aAF3fF00896c264E8E0032ccd43A5bb";

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const wallet = new HDWalletProvider(
  "youth remind believe review true law immune glad milk tell please airport",
  "https://ropsten.infura.io/v3/83b91f2683ae41d4a426fd1f2d022cef"
);

const web3 = new Web3(wallet);

async function transact() {
  try {
    const accounts = await web3.eth.getAccounts();
    
    console.log("accounts: ", accounts);

    const accountBalance = await web3.eth.getBalance(accounts[0]);

    console.log("balance: ", accountBalance);

    const contract = new web3.eth.Contract(abi, contract_address);
    
    const message = await contract.methods.getHelloWorld().call();

    console.log("message: ", message);
  }
  catch(err) {
    console.log("error: ", err);
  }
}

transact();