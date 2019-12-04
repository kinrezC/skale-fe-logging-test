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
import { Link } from "react-router-dom";

import useStyles from "../styles";

const bitski = new Bitski(
  "37a58180-64c6-46aa-9586-e5feba1d7a46",
  "http://localhost:3000/callback"
);

const Container = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setProvider = async () => {
    await bitski.signIn();
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
                      {window.ethereum.selectedAddress ? (
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
