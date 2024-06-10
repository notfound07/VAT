import './Nav-Foot.css';
import React from 'react';

function Navbar() {
    return (
        <div class="frame">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
            <div class="company-logo-parent">
                <b class="company-logo">Company Logo</b>
                <div class="home-parent">
                    <b class="home">Home</b>
                    <b class="product" id="productText">Product</b>
                    <b class="who-we-are" id="whoWeAre">Who we are</b>
                    <b class="contact-us" id="contactUsText">Contact Us</b>
                    <b class="signin" id="signInText">SignIn</b>
                    <div class="shopping-cart-parent">
                        <div class="shopping-cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <b class="cart" id="cartText">Cart</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
