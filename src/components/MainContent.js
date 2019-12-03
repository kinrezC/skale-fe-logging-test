import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";

import useStyles from "../styles";
import { bytecode, abi } from "../constants/abi";

const MainContent = ({ web3 }) => {
  const classes = useStyles();
  const [account, setAccount] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then(r => setAccount(r[0]));
    }
  }, [web3]);

  const deployContract = () => {
    web3.eth
      .sendTransaction({ from: account, data: bytecode, gasLimit: 4000000 })
      .then(r => {
        setContractInstance(new web3.eth.Contract(abi, r.contractAddress));
        setContractAddress(r.contractAddress);
      });
  };

  return (
    <>
      <div>
        <Typography variant="h2">Skale Contract Playground</Typography>
      </div>
      <Button className={classes.unlockButton} onClick={() => deployContract()}>
        Deploy Contract to SKALE
      </Button>
      <Button className={classes.unlockButton} onClick={() => null} />
    </>
  );
};

export default MainContent;
