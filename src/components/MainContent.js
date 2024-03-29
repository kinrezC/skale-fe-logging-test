import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import Web3 from "web3";

import useStyles from "../styles";
import { bytecode, abi } from "../constants/abi";

const web3 = new Web3(window.terminal.ethereum || null);

const MainContent = () => {
  const classes = useStyles();
  const [contractInstance, setContractInstance] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [dappStatus, setDappStatus] = useState("");

  const deployContract = () => {
    const addr = window.ethereum ? window.ethereum.selectedAddress : "";
    web3.eth
      .sendTransaction({
        from: addr,
        data: bytecode,
        gasLimit: 4000000
      })
      .then(r => {
        setContractInstance(new web3.eth.Contract(abi, r.contractAddress));
        setContractAddress(r.contractAddress);
        setDappStatus(`Contract Address: ${r.contractAddress}`);
        console.log(r);
      });
  };

  const readContract = () => {
    contractInstance.methods
      .getValue()
      .call()
      .then(r => setDappStatus(`Current Value: ${r}`));
  };

  const sendTransaction = () => {
    const addr = window.ethereum ? window.ethereum.selectedAddress : "";
    const max = Math.ceil(2000);
    const min = Math.floor(2);
    contractInstance.methods
      .setNumber(Math.round(Math.random() * max - min + min))
      .send({ from: addr })
      .then(setDappStatus("Requesting Signature"));
  };

  const sendFunds = () => {
    const addr = window.ethereum ? window.ethereum.selectedAddress : "";
    web3.eth
      .sendTransaction({
        from: addr,
        to: contractAddress,
        value: web3.utils.toWei(".02", "ether")
      })
      .then(setDappStatus("Requesting .02 Ether"));
  };

  const getBalance = () => {
    web3.eth
      .getBalance(contractAddress)
      .then(r =>
        setDappStatus(`Contract Balance: ${web3.utils.fromWei(r, "ether")}`)
      );
  };

  const withdrawFunds = () => {
    const addr = window.ethereum ? window.ethereum.selectedAddress : "";
    contractInstance.methods
      .makeWithdrawal()
      .send({ from: addr })
      .then(setDappStatus("Requesting Funds Withdrawal Signature"));
  };

  return (
    <div className={classes.root}>
      <div className={classes.appContainer}>
        <div>
          <Typography variant="h3" className={classes.title}>
            Skale Contract Playground
          </Typography>
        </div>
        <Button
          className={classes.unlockButton}
          onClick={() => deployContract()}
        >
          Deploy Contract to SKALE
        </Button>
        <div className={classes.mainButtonContainer}>
          <Button
            className={classes.unlockButton}
            onClick={() => readContract()}
            disabled={!contractInstance}
          >
            Read Contract Storage
          </Button>
        </div>
        <div className={classes.mainButtonContainer}>
          <Button
            className={classes.unlockButton}
            onClick={() => sendTransaction()}
            disabled={!contractInstance}
          >
            Update Contract Storage
          </Button>
        </div>
        <div className={classes.mainButtonContainer}>
          <Button
            className={classes.unlockButton}
            onClick={() => sendFunds()}
            disabled={!contractInstance}
          >
            Send Test Ether To Contract
          </Button>
        </div>
        <div className={classes.mainButtonContainer}>
          <Button
            className={classes.unlockButton}
            onClick={() => getBalance()}
            disabled={!contractInstance}
          >
            Get Contract Balance
          </Button>
        </div>
        <div className={classes.mainButtonContainer}>
          <Button
            className={classes.unlockButton}
            onClick={() => withdrawFunds()}
            disabled={!contractInstance}
          >
            Withdraw Funds
          </Button>
        </div>
        <div className={classes.mainButtonContainer}>
          <Typography variant="h5" className={classes.title}>
            {dappStatus}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
