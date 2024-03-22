import './App.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';
import Login1 from './components/Login1';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import EditProfile from './components/EditProfile';


function App() {
  return (

    <div>
    
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login1/>}   ></Route>
     
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/Tasks" element={<Tasks/>}></Route>
      <Route path="/Leaves" element={<Leaves/>}></Route>
      <Route path="/EditProfile" element={<EditProfile/>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
  );
  
}

export default App;
