import React, { useState } from "react";
import { Bitski } from "bitski";
import {
  Backdrop,
  Button,
  Dialog,
  Paper,
  Fade,
  Typography
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Web3 from "web3";
import { TerminalHttpProvider } from "@terminal-packages/sdk";

import useStyles from "../styles";

const bitski = new Bitski(
  "37a58180-64c6-46aa-9586-e5feba1d7a46",
  "http://localhost:3000/bitski"
);

const skaleNetwork = {
  rpcUrl: "http://sip1.skalenodes.com:10046",
  chainId: 1
};

const bitskiProvider = bitski.getProvider({ skaleNetwork });

const Container = ({ setBitskiWeb3 }) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setProvider = async () => {
    await bitski.signIn();
    setBitskiWeb3(
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
    history.push("/bitski");
  };

  const unlockMetamask = async () => {
    await window.ethereum.enable();
  };

  return (
    <div className={classes.root}>
      <div className={classes.appContainer}>
        <div>
          <Typography variant="h3" className={classes.title}>
            Skale Contract Playground
          </Typography>
        </div>
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
                      {window.ethereum && window.ethereum.selectedAddress ? (
                        <Link to="/metamask">
                          <Button className={classes.unlockButton}>
                            Metamask
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          className={classes.unlockButton}
                          onClick={() => unlockMetamask()}
                        >
                          Unlock Metamask
                        </Button>
                      )}
                    </div>
                    <div className={classes.modalButton}>
                      <Button
                        className={classes.unlockButton}
                        onClick={() => setProvider()}
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
      </div>
    </div>
  );
};

export default Container;
