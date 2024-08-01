import React, { useState,useEffect } from "react";
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
import { products } from "./Resources/Products.js";
import Cart from "./Cart/Cart.jsx";
import { CartProvider } from "./Resources/CartContext.jsx";
import useLocalStorage from './Resources/useLoaclStorage';
import { createContext } from "react";
import Order from "./Order/Order.jsx";
import Add from "./New/Add.jsx";
import Review from "./Product_Details/Review.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Workslider from "./Home/workslider.jsx";
export const RecoveryContext = createContext();
function App() {
  const [email, setEmail] = useState();
  const [show,setShow]=useLocalStorage('show',false)
  const [orders,setOrder]=useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);  

  useEffect(() => {
    const fetchAllResponses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vat/getAllProducts");
        if (response.status === 200) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching All responses:", error);
      }
    };  
    fetchAllResponses()
  }, [])
  return (
    <CartProvider>
      <RecoveryContext.Provider value={{ email, setEmail,setShow,show,orders,setOrder,title,setTitle,description,setDescription,image,setImage }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Footer" element={<Footer />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/Shopping"element={<Shopping products={products} />}/>
            <Route path="/Add" element={<Add />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Details/:id" element={<Detail />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Forget" element={<Forget />} />
            <Route path="/Recover" element={<Recover />} />
            <Route path="/Order" element={<Order />} />
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/workslider' element={<Workslider/>}/>
          </Routes>
        </div>
      </RecoveryContext.Provider>
    </CartProvider>
  );
}

export default App;
