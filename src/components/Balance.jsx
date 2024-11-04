import axios from "axios";
import React, { useState } from "react";
import { getServer } from "../util";




function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userData = {id: inputValue}
    const res = await axios.post(`${getServer()}/balance`, userData, config)
    const balance = res.data.msg
    setBalance(balance);
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} Nwaro tokens.</p>
    </div>
  );
}

export default Balance;
