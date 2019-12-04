import React, { useState, useEffect } from "react";
import { Bitski } from "bitski";
import Web3 from "web3";
import { TerminalHttpProvider } from "@terminal-packages/sdk";
import useStyles from "../styles";
import { Typography, Button } from "@material-ui/core";
import { abi, bytecode } from "../constants/abi";

const bitski = new Bitski(
  "37a58180-64c6-46aa-9586-e5feba1d7a46",
  "http://localhost:3000/bitski"
);

const skaleNetwork = {
  rpcUrl: "http://sip1.skalenodes.com:10046",
  chainId: 1
};

const bitskiProvider = bitski.getProvider({ skaleNetwork });

const BitskiGoto = () => {
  const classes = useStyles();

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [dappStatus, setDappStatus] = useState("");

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then(r => {
        setAccount(r[0]);
      });
    }
  }, [web3]);

  const deployContract = () => {
    web3.eth
      .sendTransaction({ from: account, data: bytecode, gasLimit: 4000000 })
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
    const max = Math.ceil(2000);
    const min = Math.floor(2);
    contractInstance.methods
      .setNumber(Math.round(Math.random() * max - min + min))
      .send({ from: account })
      .then(setDappStatus("Successfully Called SetValue!"));
  };

  const sendFunds = () => {
    web3.eth
      .sendTransaction({
        from: account,
        to: contractAddress,
        value: web3.utils.toWei(".2", "ether")
      })
      .then(setDappStatus("Sent .2 Ether"));
  };

  const getBalance = () => {
    web3.eth
      .getBalance(contractAddress)
      .then(r =>
        setDappStatus(`Contract Balance: ${web3.utils.fromWei(r, "ether")}`)
      );
  };

  const withdrawFunds = () => {
    contractInstance.methods
      .makeWithdrawal()
      .send({ from: account })
      .then(setDappStatus("Withdrew Funds"));
  };

  const setBitski = async () => {
    setWeb3(
      new Web3(
        new TerminalHttpProvider({
          customHttpProvider: bitskiProvider,
          source: "Bitski",
          networkSource: "Skale",
          apiKey: "rt92QzoCp2/KdqHjBgbccA==",
          projectId: "geParyjQMPjpqXxO"
        })
      )
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.appContainer}>
        <div>
          <Typography variant="h3" className={classes.title}>
            Skale Contract Playground
          </Typography>
        </div>
        <div className={classes.mainButtonContainer}>
          <Button className={classes.unlockButton} onClick={() => setBitski()}>
            Connect to Web3
          </Button>
        </div>
        <div className={classes.mainButtonContainer}>
          <Button
            className={classes.unlockButton}
            onClick={() => deployContract()}
            disabled={!web3}
          >
            Deploy Contract to SKALE
          </Button>
        </div>
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

export default BitskiGoto;
