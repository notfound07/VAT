import React from 'react';
import './Done.css'
import {useNavigate } from 'react-router-dom'

function Done() {
  const useremail=localStorage.getItem(1);
  const navigate=useNavigate()
  const fresh=()=>{
    localStorage.removeItem("date");
    localStorage.removeItem("time");
    localStorage.removeItem("contact");
    localStorage.removeItem("id");
    localStorage.removeItem("item");
    localStorage.removeItem("restraunt");
    localStorage.removeItem("seats");
    localStorage.removeItem("branch name");
    navigate('/Home');
  }
  return (
    <div className='body'>
      <div class="card">
        <div>
          <i class="checkmark">✓</i>
        </div>
        <h1 className='h-done '>Success</h1>
        <p className='p-done'>Booking Confirmed</p>
        <p className='p-done'>Email has been sent to {useremail} </p>
        <a className="popup-goes" onClick={fresh}>Thank You</a>
      </div>
    </div>
  )
}
export default Done
