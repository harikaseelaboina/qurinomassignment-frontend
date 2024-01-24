import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import UserLoginForm from './Components/Userlogin';
import UserRegistrationForm from './Components/UserRegistration';
import Products from './Components/Products';
import MarchantLoginForm from './Components/Merchantlogin';
import MerchantDashboard from './Components/MerchantDashboard';
import AddProducts from './Components/AddProducts';
import ViewProducts from './Components/ViewProducts';
import MerchantRegistrationForm from './Components/MerchantRegistration';

const App = () => {
  const gradientStyle = {
    background: 'linear-gradient(to right, #2E3192 , #1BFFFF)', 
    
    color: '#fff', 
    width:"100vw"
  };
  return (
    <div className='container-fluid ' style={gradientStyle}>
<BrowserRouter>
<Navbar/>
<Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/userlogin" element={<UserLoginForm/>} />
<Route path="/user-registration" element={<UserRegistrationForm/>} />
<Route path="/products" element={<Products/>} />
<Route path="/merchantlogin" element={<MarchantLoginForm/>} />
<Route path="/merchnatdashboard" element={<MerchantDashboard/>} />
<Route path="/addproducts" element={<AddProducts/>} />
<Route path="/viewproducts" element={<ViewProducts/>} />
<Route path="/merchant-registration" element={<MerchantRegistrationForm/>} />
</Routes>
</BrowserRouter>

    </div>
  )
}

export default App