import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Web3 from "web3";

import Container from "./components/Container";
import MainContent from "./components/MainContent";
import BitskiGoto from "./components/BitskiGoto";

const web3 = new Web3(window.ethereum);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/callback">
          <BitskiGoto />
        </Route>
        <Route path="/metamask">
          <MainContent web3={web3} />
        </Route>
        <Route exact path="/">
          <Container />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
