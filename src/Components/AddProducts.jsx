import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const AddProducts = () => {
    const location = useLocation();
    const loggedInEmail = location.state?.loggedInEmail;
    console.log(loggedInEmail)

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    subcategory: '',
    price: 0,
    description: '',
    businessName: '',
    postedBy: loggedInEmail 
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post('https://assignment-backend-9tdn.onrender.com/product/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
       alert('Product added successfully');
        // Optionally, you can reset the form fields after successful submission
        setFormData({
          productName: '',
          category: '',
          subcategory: '',
          price: 0,
          description: '',
          businessName: '',
          postedBy: ''
        });
      } else {
        console.error('Product addition failed');
      }
    } catch (error) {
      console.error('Error during product addition:', error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent:"center",minHeight:"90vh" }}>
      <h2>Add Product</h2>
      <p>(adding products by {loggedInEmail})</p>
      <form onSubmit={handleFormSubmit}>
        <label>Product Name:</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} required />
        <br></br>
        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
        <br></br>
        <label>Subcategory:</label>
        <input type="text" name="subcategory" value={formData.subcategory} onChange={handleInputChange} required />
        <br></br>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
        <br></br>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        <br></br>
        <label>Business Name:</label>
        <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required />
        <br></br>
        <button type="submit">Add Product</button>
      </form>
      {/* <Link to="/merchnatdashboard"><button style={{marginTop:"20px", color:"blue",backgroundColor:"lightpink",fontWeight:"bold"}}> Back To  Merchant dashboard</button></Link> */}
    </div>
  );
};

export default AddProducts;
