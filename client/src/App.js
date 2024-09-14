import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./user/Login.jsx";
import Register from "./user/Register.jsx";
import Home from "./Home/Home.jsx";
import Navbar from "./Nav-Foot/Navbar.jsx";
import Footer from "./Nav-Foot/Footer.jsx";
import Shopping from "./Shopping/Shopping.jsx";
import Detail from "./Product_Details/Detail.jsx";
import Contact from "./Contact/Contact.jsx";
import Forget from "./Forget_Password/Forget.jsx";
import Recover from "./Forget_Password/Recover.jsx";
import Cart from "./Cart/Cart.jsx";
import { CartProvider } from "./Resources/CartContext.jsx";
import useLocalStorage from './Resources/useLoaclStorage';
import { createContext } from "react";
import Add from "./New/Add.jsx";
import Review from "./Product_Details/Review.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Workslider from "./Home/workslider.jsx";
import CustomCarousel from "./Home/slider.jsx";
import Design from "./Design/Design.jsx";
import Kiosk from "./Shopping/Kiosk.jsx";
import EmailInput from "./Forget_Password/EmailInput.jsx";

export const RecoveryContext = createContext();
function App() {
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  const [show, setShow] = useLocalStorage('show', false)
  const [logged, setLogged] = useState(false)
  const [token, setToken] = useState(null);
  const [orders, setOrder] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null); // New video state

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;


  useEffect(() => {
    const fetchAllResponses = async () => {
      try {

        const response = await axios.get(`${baseURL}/getAllProducts`);
        if (response.status === 200) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching All responses:", error);
      }
    };
    fetchAllResponses()
  }, [baseURL]);
  return (
    <CartProvider>
      <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP, logged, setLogged, setShow, show, token, setToken, orders, setOrder, title, setTitle, description, setDescription, image, setImage, video, setVideo }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Footer" element={<Footer />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/Shopping" element={<Shopping />} />
            <Route path='/Kiosk' element={<Kiosk />} />
            <Route path="/Add" element={<Add />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Details/:id" element={<Detail />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/EmailInput" element={<EmailInput />} />
            <Route path="/Forget" element={<Forget />} />
            <Route path="/Recover" element={<Recover />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/workslider' element={<Workslider />} />
            <Route path='/customcarousel' element={<CustomCarousel />} />
            <Route path='/Design' element={<Design />} />
          </Routes>
        </div>
      </RecoveryContext.Provider>
    </CartProvider>
  );
}

export default App;
