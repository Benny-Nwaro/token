import { register } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import { message } from "antd";
import { Link, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from "react";

const Register = ({ auth, register }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = inputs;
    const newUser = { name, email, password };
    if (password === password2) {
      register(newUser);
    } else {
      message.error("Passwords do not match");
    }
  };

  useEffect(() => {
    if (auth.errors && auth.errors.length > 0) {
      auth.errors.forEach((error) => message.error(error.msg));
    } else if (localStorage.token !== undefined) {
      message.success("Successfully registered");
      setTimeout(() => navigate('/home', { replace: true }), 3000); 

    }
  }, [auth]);

  return (
    <div className="container" style={{margin:"50px"}}>
      <img style={{width:"500px", float:"left", borderRadius:"4px", marginRight:"10px"}} src="https://media1.tenor.com/m/ELWc6po28wQAAAAd/coin-flip.gif"/>
      <div className="form-group">
        <h1  className="large text-primary">Register to Claim 10,000 Nwaro tokens</h1>
        <p className="lead">
          <i className="fa-solid fa-user"></i> Create Account
        </p>
        <form onSubmit={onSubmit}>
          <div className="form">
            <input
              style={{width:"500px" , marginTop:"10px", marginBottom:"10px"}}
              name="name"
              type="text"
              placeholder="Enter name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <input
              style={{width:"500px" , marginTop:"10px", marginBottom:"10px"}}
              name="email"
              type="email"
              placeholder="Enter Email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <input
             style={{width:"500px" , marginTop:"10px", marginBottom:"10px"}}
              name="password"
              type="password"
              placeholder="Enter password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <input
              style={{width:"500px" , marginTop:"10px", marginBottom:"10px"}}
              name="password2"
              type="password"
              placeholder="Confirm password"
              value={inputs.password2}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p className="my-1">
          Already have an account?  <Link to="/login">
          Log in
          </Link>
          </p>
        </form>
      </div>
    </div>

  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { register })(Register);