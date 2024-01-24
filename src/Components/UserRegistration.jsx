import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
  });

  const [registrationError, setRegistrationError] = useState('');

  const navigate=useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = () => {
    axios.post('https://assignment-backend-9tdn.onrender.com/user/api/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('User registered successfully');
          setFormData({
            name: '',
            age: '',
            gender: '',
            email: '',
            password: '',
          });
          // Clear any previous registration error message
          setRegistrationError('User registered successfully');
          alert("Registered Successfully");
          navigate("/userlogin")
        } else {
          console.error('Registration failed');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Email already registered error
          setRegistrationError('Email is already registered. Please use a different email.');
        } else {
          console.error('Error during registration:', error.message);
        }
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      <h2>User Registration</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleInputChange} />
        <br></br>
        <label>Age:</label>
        <input type="number" name="age" onChange={handleInputChange} />
        <br></br>
        <label>Gender:</label>
        <input type="text" name="gender" onChange={handleInputChange} />
        <br></br>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleInputChange} />
        
        <br></br>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleInputChange} />
        <br></br>
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
      <p>{registrationError}</p>
    </div>
  );
};

export default UserRegistrationForm;
