import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewProducts = () => {
  const location = useLocation();
  const loggedInEmail = location.state?.loggedInEmail;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://assignment-backend-9tdn.onrender.com/product/getbypost/${loggedInEmail}`);

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error during product fetch:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInEmail) {
      fetchProducts();
    }
  }, [loggedInEmail]); // Fetch products when loggedInEmail changes

  const handleUpdate = async (productId) => {
    try {
      const updatedProductName = prompt('Enter updated product name:', products.find((p) => p._id === productId)?.productName);
      const updatedCategory = prompt('Enter updated category:', products.find((p) => p._id === productId)?.category);
      const updatedSubcategory = prompt('Enter updated subcategory:', products.find((p) => p._id === productId)?.subcategory);
      const updatedDescription = prompt('Enter updated description:', products.find((p) => p._id === productId)?.description);
      const updatedPrice = prompt('Enter updated price:', products.find((p) => p._id === productId)?.price);
  
      if (
        updatedProductName !== null ||
        updatedCategory !== null ||
        updatedSubcategory !== null ||
        updatedDescription !== null ||
        updatedPrice !== null
      ) {
        const response = await axios.put(`https://assignment-backend-9tdn.onrender.com/product/update/${productId}`, {
          productName: updatedProductName,
          category: updatedCategory,
          subcategory: updatedSubcategory,
          description: updatedDescription,
          price: updatedPrice,
        });
  
        if (response.status === 200) {
          // Update the product in the local state
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId
                ? {
                    ...product,
                    productName: updatedProductName || product.productName,
                    category: updatedCategory || product.category,
                    subcategory: updatedSubcategory || product.subcategory,
                    description: updatedDescription || product.description,
                    price: updatedPrice || product.price,
                  }
                : product
            )
          );
          alert('Product updated successfully');
        } else {
          console.error('Product update failed');
        }
      }
    } catch (error) {
      console.error('Error during product update:', error.message);
    }
  };
  

  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', marginTop: '50px' }}>
      <h2>Products Posted by {loggedInEmail}</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {products.map((product) => (
            <div key={product._id} style={{minWidth:"30%",maxWidth:"30%", border: '2px solid black', padding: '10px', margin: '20px' }}>
              <h3>{product.productName}</h3>
              <p>Category: {product.category}</p>
              <p> Sub Category: {product.subcategory}</p>
              <p>product description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleUpdate(product._id)}>Edit Product</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
