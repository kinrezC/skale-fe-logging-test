import React, { useState } from "react";
import Web3 from "web3";

import { abi, bytecode } from "./constants/abi";
import Container from "./components/Container";

const web3 = new Web3(window.terminal.ethereum);

const contract = new web3.eth.Contract(
  abi,
  "0x67fD710148F68fDBA99Af538c7AC49BaE60f883A"
);

const readValue = () => {
  contract.methods
    .getValue()
    .call()
    .then(console.log);
};

const deployContract = (setAddress, setContractInstance) => {
  web3.eth
    .sendTransaction({
      from: window.ethereum.selectedAddress,
      data: bytecode
    })
    .then(r => {
      setAddress(r.contractAddress);
      setContractInstance(abi, r.contractAddress);
    });
};

const setValue = contractInstance => {
  contractInstance.methods
    .setNumber(15)
    .send({ from: window.ethereum.selectedAddress })
    .then(console.log);
};

const App = () => {
  const [address, setAddress] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  return <Container />;
};

export default App;
