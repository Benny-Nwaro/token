import React from "react";
import Faucet from "./components/Faucet";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";
import Header from "./components/Header"

function App(props) {

  return (
    <div id="screen">
      <Header />
      <Faucet />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
