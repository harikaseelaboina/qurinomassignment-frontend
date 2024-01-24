import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const MerchantDashboard = () => {
  const location = useLocation();
  const loggedInEmail = location.state?.loggedInEmail;

  console.log("hello",loggedInEmail)

  const [allMerchantDetails, setAllMerchantDetails] = useState([]);
  const [filteredMerchantDetails, setFilteredMerchantDetails] = useState([]);

  useEffect(() => {
    // Fetch all merchant details
    const fetchAllMerchantDetails = async () => {
      try {
        const response = await axios.get('https://assignment-backend-9tdn.onrender.com/merchants/api/getAll');
        
        if (response.status === 200) {
          // Update the state with all fetched merchant details
          setAllMerchantDetails(response.data);
        } else {
          console.error('Failed to fetch all merchant details');
        }
      } catch (error) {
        console.error('Error during all merchant details fetch:', error.message);
      }
    };

    // Fetch all merchant details when the component mounts
    fetchAllMerchantDetails();
  }, []); // Fetch all details once when the component mounts

  useEffect(() => {
    // Filter merchant details based on the logged-in email
    if (loggedInEmail) {
      const filteredMerchants = allMerchantDetails.filter(merchant => merchant.email === loggedInEmail);
      setFilteredMerchantDetails(filteredMerchants);
    }
  }, [loggedInEmail, allMerchantDetails]); // Filter details when loggedInEmail or allMerchantDetails change

  const navigate = useNavigate();

  const handleAddProductsClick = () => {
    navigate('/addproducts', { state: { loggedInEmail } });
  };

  const handleViewProductsClick = () => {
    navigate('/viewproducts', { state: { loggedInEmail } });
  };

  return (
    <div style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
     

      {filteredMerchantDetails.length > 0 ? (
        <div style={{textAlign:"center"}}>
          <h3>Welcome to Dashboard</h3>
          {filteredMerchantDetails.map(merchant => (
            <div key={merchant._id}>
              <h6> {merchant.name} , {merchant.city}</h6>
             
              
             
              <p>Business Name: {merchant.businessName}</p>
              <p>Email: {merchant.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading or no matching merchant details...</p>
      )}
 <button  onClick={handleAddProductsClick} style={{ margin: "10px" }}>Add Products</button>
 
     <button onClick={handleViewProductsClick}>View Added products</button>   
    </div>
  );
};

export default MerchantDashboard;
