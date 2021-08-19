const solc = require("solc");
const fs = require("fs");

const contractSourceCode = fs.readFileSync("./contracts/HelloWorld.sol", "utf-8");

const config = {
  language: 'Solidity',
  sources: {
    "HelloWorld.sol": {
      content: contractSourceCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const compiledCode = solc.compile(JSON.stringify(config));

const contract = JSON.parse(compiledCode).contracts["HelloWorld.sol"]["HelloWorld"];

const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const wallet = new HDWalletProvider(
  "youth remind believe review true law immune glad milk tell please airport",
  "https://ropsten.infura.io/v3/83b91f2683ae41d4a426fd1f2d022cef"
);

const web3 = new Web3(wallet);

async function deploy() {

  try {
    const accounts = await web3.eth.getAccounts();
    
    console.log("accounts: ", accounts);

    const accountBalance = await web3.eth.getBalance(accounts[0]);

    console.log("balance: ", accountBalance);

    const contract = new web3.eth.Contract(abi);

    const response = await contract.deploy({ data: bytecode }).send({ from: accounts[0], gas: "1000000" })

    console.log("response: ", response);

  }
  catch(err) {
    console.error(err);
  }

}

deploy();

// 1 ether = 10^18 wei
// 5 ether = 5 * 10^18 wei;
