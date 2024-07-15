import React, { useState } from "react";
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
import { createContext } from "react";
import Order from "./Order/Order.jsx";
import Add from "./New/Add.jsx";
import Review from "./Product_Details/Review.jsx";
export const RecoveryContext = createContext();
function App() {
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  return (
    <CartProvider>
      <RecoveryContext.Provider value={{ email, setEmail, show, setShow }}>
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
          </Routes>
        </div>
      </RecoveryContext.Provider>
    </CartProvider>
  );
}

export default App;
