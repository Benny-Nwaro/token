import React from 'react'
import Header from "../components/Header"
import Faucet from "../components/Faucet";
import Balance from "../components/Balance";
import Transfer from "../components/Transfer";

export default function Home() {
  return (
    <div>
        <Header />
        <Faucet />
        <Balance />
        <Transfer />
    </div>
  )
}
