import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { login } from "../../redux/actions/authAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.auth.errors);

  const redirect = "/home";
  
  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((error) => message.error(error.msg));
    }
  }, [errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
     dispatch(login({ email, password }));
    if(isAuthenticated){
      navigate(redirect, { replace: true });

    }
  };

  return (
    <div className="container" style={{margin:"50px"}}>
         <img style={{width:"500px", float:"left", borderRadius:"4px", marginRight:"10px"}} src="https://media1.tenor.com/m/ELWc6po28wQAAAAd/coin-flip.gif"/>

      <h1 className="large text-primary">Sign in to Claim 10,000 Nwaro tokens</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <div className="form">
        <input
        style={{width:"500px"}}
          name="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={onChange}
        />
      </div>
      <div className="form">
        <input
        style={{width:"500px" , marginTop:"10px", marginBottom:"10px"}}
          name="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={onChange}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Sign In
      </button>
      <p className="my-1">
        Don't have an account? 
        <Link to={`/`}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
