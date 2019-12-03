import React, { useState } from "react";
import MainContent from "./MainContent";
import {
  Backdrop,
  Button,
  Dialog,
  Paper,
  Fade,
  Typography
} from "@material-ui/core";

import Web3 from "web3";
import { Bitski } from "bitski";
import { TerminalHttpProvider, SourceType } from "@terminal-packages/sdk";

import useStyles from "../styles";

const bitski = new Bitski("d56192ce-8a28-4aaa-9b3e-66b83b3dbbca");

const skaleNetwork = {
  rpcUrl: "http://sip1.skalenodes.com:10046",
  chainId: 1
};

const Container = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [web3, setWeb3] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setProvider = async type => {
    if (type === "Metamask") {
      setWeb3(new Web3(window.terminal.ethereum));
    } else if (type === "bitski") {
      await bitski.signIn();
      setWeb3(
        new Web3(
          new TerminalHttpProvider({
            customHttpProvider: bitski.getProvider({ skaleNetwork }),
            source: SourceType.Bitski,
            networkSource: "Skale",
            apiKey: "rt92QzoCp2/KdqHjBgbccA==",
            projectId: "geParyjQMPjpqXxO"
          })
        )
      );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.appContainer}>
        <div>
          <Typography variant="h3" className={classes.title}>
            Skale Contract Playground
          </Typography>
        </div>
        {!web3 ? (
          <>
            <div>
              <Button
                className={classes.unlockButton}
                onClick={() => handleOpen()}
              >
                Select Wallet
              </Button>
            </div>
            <>
              <Dialog
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
                closeAfterTransition
              >
                <Fade in={open}>
                  <Paper className={classes.modal}>
                    <Typography variant="h4" style={{ marginTop: 50 }}>
                      Select Wallet Provider
                    </Typography>
                    <div className={classes.modalButtonContainer}>
                      <div className={classes.modalButton}>
                        <Button
                          className={classes.unlockButton}
                          onClick={() => setProvider("Metamask")}
                        >
                          Metamask
                        </Button>
                      </div>
                      <div className={classes.modalButton}>
                        <Button
                          className={classes.unlockButton}
                          onClick={() => setProvider("bitski")}
                        >
                          Bitski
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </Fade>
              </Dialog>
            </>
          </>
        ) : (
          <MainContent web3={web3} />
        )}
      </div>
    </div>
  );
};

export default Container;
