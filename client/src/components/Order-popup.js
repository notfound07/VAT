import React from 'react';
import './order-popup.css';
import { useNavigate } from 'react-router-dom';

function OrderPopup() {
    const navigate = useNavigate();
    const seat = localStorage.getItem("seats");
    const restrauntname = localStorage.getItem("restraunt");

    const handleNavigation = () => {
        if (restrauntname) {
            switch (restrauntname) {
                case 'Aslam Chicken':
                    console.log("Navigating to Aslam Chicken");
                    navigate(`/Selectionmenu#Aslamchicken`);
                    break;
                case 'Bukhara':
                    console.log("Navigating to Bukhara");
                    navigate(`/Selectionmenu#Bukhara`);
                    break;
                case 'Gulati':
                    console.log("Navigating to Gulati");
                    navigate(`/Selectionmenu#Gulati`);
                    break;
                case "Karim's":
                    console.log("Navigating to Karim's");
                    navigate(`/Selectionmenu#Karim`);
                    break;
                case 'Rajender Da Dhaba':
                    console.log("Navigating to Rajinder Da Dhaba");
                    navigate(`/Selectionmenu#Rajinderdadhaba`);
                    break;
                case 'Sagar Ratna':
                    console.log("Navigating to Sagar Ratna");
                    navigate(`/Selectionmenu#Sagarratna`);
                    break;
                case 'Sandoz':
                    console.log("Navigating to Sandoz");
                    navigate(`/Selectionmenu#Sandoz`);
                    break;
                case 'Varq':
                    console.log("Navigating to Varq");
                    navigate(`/Selectionmenu#Varq`);
                    break;
                default:
                    console.log("Navigating to default");
                    navigate(`/Selectionmenu`);
                    break;
            }
        }
    };

    return (
        <div>
            <div id="popup1" className="overlay">
                <div className="popup">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <a className="popup-close" href="##" onClick={(e) => { e.preventDefault(); window.history.go(-1); }}>&times;</a>
                        <p className='want'>Total No. Of Seats Selected</p>
                        <div className="buttonIn">
                            <input type="number" disabled className="seats-inbox" id='seats' value={seat} />
                        </div>
                        <div>
                            <p className='want'>Proceed with Your Selection</p>
                            <button className='proceed-button' onClick={handleNavigation}>Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderPopup;
