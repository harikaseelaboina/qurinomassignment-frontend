// LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://assignment-backend-9tdn.onrender.com/user/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('User logged in successfully');
        navigate('/products');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div style={{height:"90vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h2>User Login</h2>
      <form style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleInputChange} />
        </div>
        <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div style={{marginTop:"4rem"}}>
<span>please register before login</span>
     <Link to='/user-registration'><button className='btn btn-primary'>Register</button> </Link>
     </div>
    </div>
  );
};

export default UserLoginForm;
