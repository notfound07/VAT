import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecoveryContext } from "../App";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "./Style.css";

function Register() {
  const [name, setName] = useState("");
  const {email, setEmail}= useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3001/vat/signup",{
        name,
        email,
        password,
        confirmpassword,
      });

      if(response.status === 201){
        navigate('/login')
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div class="parent-signup-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      ></link>
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
          <form>
            <div className="signup-form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="log-res" onClick={submit}>
              Sign Up <i class="fa-solid fa-right-long"></i>
            </button>
            <div className="signup-links">
              <a href="/Login">Already have an account?</a>
            </div>
          </form>
        </div>
        <div className="signup-right">
          <div>Image or color</div>
        </div>
        <Link to="/Home" className="signup-home-link">
          Home
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default Register;
