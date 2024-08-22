import React, { Component } from "react";
import Navbar from '../nav-foot/Navbar';
import Footer from '../nav-foot/Footer';
import videoBg from '../assets/foodvideo.mp4';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <video className="vd" src={videoBg} autoPlay muted loop></video>
                <h2>#No more waiting,neither for table nor for food</h2>
                <h3>Book your seat now at Delhi's Busiest Restaurants</h3>
                <section className="sec">
                    <h3>Sagar Ratna</h3>
                    <br></br>
                    <p>
                    <img className="pic" src="https://s3-ap-southeast-1.amazonaws.com/assets.limetray.com/assets/user_images/content_images/original/about-us-sagar-ratnawedrawa.jpg" alt=""></img>
                    Sagar Ratna started its first branch in the Defence Colony Market in 1986. The authentic South Indian delicacies, cooked fresh many times a day, worked well to increase the popularity of Sagar Ratna immensely. Within a short span it spread its wings far and wide. Today Sagar Ratna has established its presence in the National Capital Region.Having won numerous awards in the Hospitality industry in various categories over the years, Sagar Ratna continues to delight its customers with its authentic South Indian food cooked fresh many times a day.</p>                                 </section>
                    <section className="sec">
                    <h3>Bukhara</h3>
                    <br></br>
                    <p>
                    <img className="pic1" src="https://media-cdn.tripadvisor.com/media/photo-s/24/90/f5/b8/bukhara-interiors.jpg" alt=""></img>
                    Bukhara proves to be, without a doubt, the mother of all authentic Indian food experiences. The signature (and massive) hot naans and malai kebabs join the slow-cooked dal bukhara in taking your palate on a journey that will delight it. You’re also encouraged to eat with your hands within the earthy and rustic interiors. Be sure to make a reservation.</p>                
                    </section>
                    <br></br>
                    <section className="sec">
                    <h3>Rajinder Da Dhaba</h3>
                    <br></br>
                    <p>
                    <img className="pic2" src="https://media-cdn.tripadvisor.com/media/photo-s/0c/54/ca/48/rajinder-da-dhaba.jpg" alt=""></img>
                    Starting out as a tiny counter in Safdarjung Enclave Market years ago, the man behind Rajinder De Dhaba has branched out to include five more pseudo counters to his roster over the years. Serving malai tikka rolls and mutton seekh kebabs in plastic silver plates, this is the ultimate joint to soak in the Dhaba experience. Be prepared to stand in line to wait for your food; it’ll be worth it.
                    </p>                
                    </section>
                    <br></br>
                    <section className="sec">
                    <h3>Karim's</h3>
                    <br></br>
                    <p>
                    <img className="pic1" src="https://10619-2.s.cdn12.com/rests/small/w312/h280/106_513560686.jpg" alt=""></img>
                    Opened in 1913, this iconic spot serves arguably the best Mughlai food in the world. Even the walk through the narrow streets of Old Delhi to get here is iconic. A hop, skip and jump away from Jama Masjid, the restaurant’s preserved original structure is historical. Don’t miss out on the famous mutton bara and brain curry.
                    </p>                
                    </section>
                    <br></br>
                    <section className="sec">
                    <h3>Sandoz</h3>
                    <br></br>
                    <p>
                    <img className="pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdccPnDF3eoL4qoXPuP0MLCyorN6fw_zdzNg&usqp=CAU" alt=""></img>
                    Sandoz is one of the hidden gems in cp and is perfect example of family restaurants. The place is famous for its super delectable food at reasonable prices so when you are high on hunger and low on pockets this place definitely comes as saviour and thats what makes it a perfect choice when it comes to family treats.
                    </p>                
                    </section>
                <Footer />                   
            </div>
        );
    }
}

export default Home;