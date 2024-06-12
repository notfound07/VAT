import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './user/Login.jsx';
import Register from './user/Register.jsx';
import Home from './Home/Home.jsx';
import Navbar from './Nav-Foot/Navbar.jsx';
import Footer from './Nav-Foot/Footer.jsx';
import Shopping from './Shopping/Shopping.jsx';
import Detail from './Product_Details/Detail.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Navbar' element={<Navbar/>}/>
      <Route path='/Footer' element={<Footer/>}/>
      <Route path='/Shopping' element={<Shopping/>}/>
      <Route path='/Details/:id' element={<Detail/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
