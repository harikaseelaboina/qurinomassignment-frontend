import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://assignment-backend-9tdn.onrender.com/product/getAll');
        
        if (response.status === 200) {
          // Update the state with the fetched products
          setProducts(response.data);

          // Extract unique categories and subcategories
          const uniqueCategories = Array.from(new Set(response.data.map(product => product.category)));
          const uniqueSubcategories = Array.from(new Set(response.data.map(product => product.subcategory)));

          // Update state with category options
          setCategoryOptions(['', ...uniqueCategories]); // Include an empty option for "All"

          // Update state with subcategory options
          setSubcategoryOptions(['', ...uniqueSubcategories]); // Include an empty option for "All"
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error during product fetch:', error.message);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Update subcategory options based on selected category
  useEffect(() => {
    if (categoryFilter) {
      const filteredSubcategories = Array.from(new Set(products
        .filter(product => product.category === categoryFilter)
        .map(product => product.subcategory)
      ));
      setSubcategoryOptions(['', ...filteredSubcategories]);
    }
  }, [categoryFilter, products]);

  // Filter products based on selected filters
  const filteredProducts = products
    .filter(product => categoryFilter ? product.category === categoryFilter : true)
    .filter(product => subcategoryFilter ? product.subcategory === subcategoryFilter : true)
    .filter(product => {
      if (priceFilter === 'below500') {
        return product.price < 500;
      } else if (priceFilter === '500to1000') {
        return product.price >= 500 && product.price <= 1000;
      } else if (priceFilter === 'above1000') {
        return product.price > 1000;
      }
      return true;
    });

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",minHeight:"100vh"}}>
      <h2>All Products</h2>

      {/* Filters */}
      <div>
        <label>Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <label>Subcategory:</label>
        <select value={subcategoryFilter} onChange={(e) => setSubcategoryFilter(e.target.value)}>
          {subcategoryOptions.map((subcategory) => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>

        <label>Price:</label>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">All</option>
          <option value="below500">Below 500</option>
          <option value="500to1000">500 - 1000</option>
          <option value="above1000">Above 1000</option>
        </select>
      </div>
<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
      {/* Display filtered products */}
      {filteredProducts.map((product) => (
        <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{product.productName}</h3>
          <p>Category: {product.category}</p>
          <p>Subcategory: {product.subcategory}</p>
          <p>Price: ${product.price}</p>
          {/* <p>Description: {product.description}</p> */}
          <p>Business Name: {product.businessName}</p>
          <p>Posted By: {product.postedBy}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Products;
