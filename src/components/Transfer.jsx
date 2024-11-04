import axios from "axios";
import React, { useState } from "react";
import { getServer } from "../util";
import { useSelector, useDispatch } from 'react-redux';


function Transfer() {
  const [recipientId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const auth = useSelector((state) => state.auth);
  const id = auth.user._id


  async function handleClick() {
    setHidden(true);
    setDisable(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userData = {senderId: id,receiverId: recipientId, transferAmount: Number(amount) }
    const result = await axios.post(`${getServer()}/transfer`, userData, config)
    console.log(result)
    setFeedback(result.data.msg);
    setHidden(false);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
