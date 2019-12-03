import React from "react";
import { Button } from "@material-ui/core";

import useStyles from "../styles";

const Fallback = ({ setProvider }) => {
  const classes = useStyles();

  const setMetamask = async () => {
    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable;
      setProvider();
    } else {
      setProvider();
    }
  };

  const setBitski = () => {
    setProvider();
  };

  return (
    <div>
      <div className={classes.buttonWrapper}>
        <Button className={classes.unlockButton} onClick={() => setMetamask()}>
          Connect To Metamask
        </Button>
      </div>
      <div className={classes.buttonWrapper}>
        <Button className={classes.unlockButton} onClick={() => setBitski()}>
          Connect To Bitski
        </Button>
      </div>
    </div>
  );
};

export default Fallback;
