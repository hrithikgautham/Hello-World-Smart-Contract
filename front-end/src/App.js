import './App.css';
import { useEffect, useState } from "react";
import Web3 from 'web3';

function App() {
  const CONTRACT_ADDRESS = "0x85a3618c2aAF3fF00896c264E8E0032ccd43A5bb";
  const CONTRACT_ABI = `[{"inputs":[],"name":"getHelloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]`;
  const [myAccountAddress, setMyAccountAdress] = useState("");
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");

  const [showLoader, setShowLoader] = useState(false);

  //setMyAccountAdress("sdfdafdasf")

  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        const accounts = await window.web3.eth.getAccounts();
        setMyAccountAdress(accounts[0]);
        const contract = await new window.web3.eth.Contract(JSON.parse(CONTRACT_ABI), CONTRACT_ADDRESS);
        setContract(contract);
      }
      catch(err) {
        console.error(err);
      }
    }
  }, []);

  async function clickHandler() {
    const message = await contract.methods.getHelloWorld().call();
    setMessage(message);
  }

  return (
    <div style={{backgroundColor: 'black', color: "white", height: "100vh"}}>
      <h1 style={{height: "100px", display: "flex", justifyContent: "space-between", padding: "10px"}}><p>Hello World Smart Contract!!</p><p style={{fontSize: "20px"}}> address: { myAccountAddress }</p></h1>

      <div style={{ display: "flex" }}>
        <button style={{ margin: "auto" }} onClick={clickHandler}>fetch hello world</button>
      </div>

      <h2>{  message }</h2>
    </div>
  );
}

export default App;
