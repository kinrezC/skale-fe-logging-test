import React, { useState } from "react";
import Web3 from "web3";
import { Bitski } from "bitski";
import { TerminalHttpProvider } from "@terminal-packages/sdk";

import abi from "./abi";

const skaleNetwork = {
  rpcUrl: "http://sip1.skalenodes.com:10046",
  chainId: 1
};

const bitski = new Bitski("d56192ce-8a28-4aaa-9b3e-66b83b3dbbca");
const bitskiProvider = bitski.getProvider({ network: skaleNetwork });

const signIn = async () => {
  await bitski.signIn();
};

const bytecode =
  "0x608060405234801561001057600080fd5b5060408051808201909152600b8082527f48656c6c6f20534b414c45000000000000000000000000000000000000000000602090920191825261005591600091610060565b50602d6001556100fb565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a157805160ff19168380011785556100ce565b828001600101855582156100ce579182015b828111156100ce5782518255916020019190600101906100b3565b506100da9291506100de565b5090565b6100f891905b808211156100da57600081556001016100e4565b90565b6101d28061010a6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806320965255146100465780633fb5c1cb14610060578063ef5fb05b1461007f575b600080fd5b61004e6100fc565b60408051918252519081900360200190f35b61007d6004803603602081101561007657600080fd5b5035610102565b005b610087610107565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100c15781810151838201526020016100a9565b50505050905090810190601f1680156100ee5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60015490565b600155565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156101935780601f1061016857610100808354040283529160200191610193565b820191906000526020600020905b81548152906001019060200180831161017657829003601f168201915b505050505090509056fea265627a7a7231582064dcc11fb2265ffdf0705ec4c46250b79683aba3f75243b84f3b594f4790fe5c64736f6c634300050b0032";

/*
const web3 = new Web3(
  new TerminalHttpProvider({
    customHttpProvider: bitskiProvider,
    apiKey: "rt92QzoCp2/KdqHjBgbccA==",
    projectId: "geParyjQMPjpqXxO",
    networkSource: "Skale",
    source: "bitski"
  })
);
*/

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

const App = () => {
  const [address, setAddress] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const sendTx = () => {
    web3.eth.getAccounts().then(accounts => {
      web3.eth
        .sendTransaction({
          from: accounts[0],
          to: accounts[0],
          value: web3.utils.toWei(".0001")
        })
        .then(console.log);
    });
  };
  return (
    <div className="App">
      <button onClick={() => signIn()}>Sign Into Bitski</button>
      <button onClick={() => sendTx()}>Send Transaction</button>
      <button onClick={() => window.ethereum.enable}>Enable Metamask</button>
      <button onClick={() => readValue()}>Read Contract</button>
      <button onClick={() => deployContract(setAddress, setContractInstance)}>
        Deploy Contract To Skale
      </button>
      <button onClick={() => console.log(address)}>Log Address</button>
      <button onClick={() => console.log(contractInstance)}>
        Log Instance
      </button>
    </div>
  );
};

export default App;
