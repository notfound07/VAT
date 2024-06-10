import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './user/Login.jsx';
import Register from './user/Register.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
