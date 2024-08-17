import './Forget.css';
import React,{useState,useContext} from 'react';
import logo from '../Assets/logo.png'; // Import the image
import { RecoveryContext } from "../App";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Recover() {
  const { email } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate=useNavigate()
  const submit = async (e) => {
    e.preventDefault();
    try {
        // Make an API request to create a new user
        const response = await axios.post(
            "http://localhost:3001/vat/reset",
            {
                email,
                password,
                confirmpassword,
            }
        );
        if (response.status === 200) {
            // User reset was successful
            console.log("Reset successful");
            navigate('/Login');
        }
    } catch (error) {
        // Handle reset errors
        console.error("Error registering user:", error);
    }
};
  return (
    <div className="forget-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="fr-container">
        <div className="middel">
          <img className="forget-company-logo" src={logo} alt="" />
          <h2>Recover Password</h2>
          <div className="recover-form-group">
            <input defaultValue={email} disabled/>
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <label htmlFor="retypepassword">Retype Password</label>
            <input type="password" id="retypepassword" name="retypepassword" onChange={(e)=>{setConfirmpassword(e.target.value)}} />        
            <button className="rec-btn" onClick={submit}>Submit <i class="fa-solid fa-right-long"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recover;
