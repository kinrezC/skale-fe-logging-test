import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Web3 from "web3";

import Container from "./components/Container";
import MainContent from "./components/MainContent";
import BitskiGoto from "./components/BitskiGoto";

const web3 = new Web3(window.ethereum);

const history = createBrowserHistory();

const App = () => {
  const [bitskiWeb3, setBitskiWeb3] = useState({});

  return (
    <Router history={history}>
      <Switch>
        <Route path="/callback">
          <BitskiGoto web3={bitskiWeb3} />
        </Route>
        <Route path="/metamask">
          <MainContent web3={web3} />
        </Route>
        <Route exact path="/">
          <Container setBitskiWeb3={setBitskiWeb3} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
