import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MerchantRegistrationForm = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    city: '',
    businessName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post('https://assignment-backend-9tdn.onrender.com/merchants/api/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Merchant registered successfully');

       navigate("/merchantlogin")
        setFormData({
          name: '',
          age: '',
          gender: '',
          city: '',
          businessName: '',
          email: '',
          password: '',
        });
      } else {
        console.error('Merchant registration failed');
      }
    } catch (error) {
      console.error('Error during merchant registration:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '90vh', justifyContent:"center" }}>
      <h2>Merchant Registration</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <br />
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
        <br />
        <label>Gender:</label>
        <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} required />
        <br />
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
        <br />
        <label>Business Name:</label>
        <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <br />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        <br />
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
};

export default MerchantRegistrationForm;
