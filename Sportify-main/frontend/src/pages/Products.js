import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]); // State for storing products
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data); // Set fetched products to state
    } catch (error) {
      console.error('Error fetching products:', error); // Log any errors
    }
  };

  // Function to handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    addToCart(product); // Call the addToCart function passed as a prop
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="products-header">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ margin: 0 }}
        /> {/* Search input field */}
      </header>
      <div className="products-container">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-block">
            <img 
              src={`http://localhost:5000/uploads/${product.imageUrl}`} 
              alt={product.name} 
              className="product-image" 
            /> {/* Product image */}
            <span>Name: {product.name}</span> {/* Product name */}
            <span>Price: R{product.price.toFixed(2)}</span> {/* Product price */}
            <p>Description: {product.description}</p> {/* Product description */}
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button> {/* Add to Cart button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
