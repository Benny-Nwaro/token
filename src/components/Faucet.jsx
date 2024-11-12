import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { getServer } from "../util";
import { Link } from "react-router-dom";



function Faucet() {
  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Gimme gimme");
  const [usageText, setUsageText] = useState(" ");
  const [isHidden, setIsHidden] = useState(true);


  const auth = useSelector((state) => state.auth);



const id = auth.user._id
const userName = auth.user.name


  async function handleClick(event) {
    try {
      if(id != undefined){
        const res = await axios.get(`${getServer()}/transaction/${id}`)
        console.log(res.data.msg)
        setDisable(true);  
        setText(res.data.msg);
      }
      
    } catch (error) {
      console.log(error)
      
    }
   
  }
  useEffect(()=>{
    async function updateData(){
      const res = await axios.get(`${getServer()}/transaction/${id}`)
      if(auth.user.tokenClaimed){
        setText(res.data.msg);
        setDisable(true);  
        setUsageText(`https://open-d.vercel.app?userid=${encodeURIComponent(id)}`)
      }
        
    }updateData()
  })

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <p>{userName}</p>
      <p>Your Id: {id}</p>
      <label>
        Get your free Nwaro tokens here! Claim 10,000 nwaro tokens 
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
      <Link to={usageText} style={{display: "inline-block", fontweight: "bolder", background: "green", color: "white",   boxShadow: "0.5em 0.5em 3px rgba(0, 0, 0, 0.5)", 
      border: "1px outset green", textDecoration:"none"}} >Click to use your tokens</Link>
    </div>
  );
}


export default Faucet
