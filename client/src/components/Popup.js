import React from 'react';
import './Popup.css'
import { } from 'react-router-dom'

function Popup() {
    return (
        <div>
            <div id="popup1" class="overlay" >
                <div class="popup">
                    <h2>User registered successfully</h2>
                    <a className="popup-comes" href="/Login">Login</a>
                </div>
            </div >
        </div>

    )
}
export default Popup