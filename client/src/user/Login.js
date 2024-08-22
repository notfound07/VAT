import { Link, useNavigate } from 'react-router-dom';
import './Style.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import logo from '../assets/key_1.webp';
import { useContext } from 'react';
import { RecoveryContext } from '../App';
import LoginApi from '../apis/LoginApi';
import RecoveryEmailApi from '../apis/RecoveryEmailApi';
function Login() {
  const { setEmail, email, setOTP } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault(); 
    if (email==="restaurant@gmail.com" && password==="0987654321"){
      navigate('/Adminpage');
    }
    else{
    try {
      const res = await LoginApi.get("/", {
        params: {
          email,
          password,
        },
      });

      if (res.status === 200) {
        const { token } = res.data;
        login(token); // Pass the token to the login function
        navigate("/Home");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message); // Display specific error messages from the server
      } else if (err.response && err.response.status === 401) {
        alert(err.response.data.message);
      } else if (err.response && err.response.status === 500) {
        alert("Something went wrong");
      } else {
        alert("An unexpected error occurred");
      }
    }
  }
    localStorage.setItem(1, email);
  }

  function navigateToOtp() {
    try {
      if (email) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log(OTP);
        setOTP(OTP);
        RecoveryEmailApi.post("/", {
            OTP,
            recipient_email: email,
          })
          .then(() => navigate('/OTPinput'))
          .catch(console.log);
        setIsLoading(true);
        return;
      }
      setIsLoading(false);
      return alert("Please enter your email");
    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  }


  return (
    <div className='grid'>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
          <div className="loading-text">Wait it might take few seconds</div>
        </div>
      )}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="box-image">
        <a href="/Home"><button class="round"><i class="fa-solid fa-arrow-left"></i></button></a>
      </div>
      <div className="box">
        <img className="center" src={logo} alt="Avatar"></img>
        <form>
          <label className="label" htmlFor="email">Email</label>
          <input className="input" type="text" name='email' autoComplete='off' placeholder="Email Id" id="username"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label className="label" type="password" htmlFor='password'>Password</label>
          <input className="input" type="password" placeholder="Password" id="password" onChange={(e) => {
            setPassword(e.target.value);
          }}></input>
          <button className="button" onClick={submit} >Log In</button>
          <div className="extra">
            <Link to="/Register" className="log">Register?</Link>
            <Link className="log" onClick={() => navigateToOtp()}>Forget Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;