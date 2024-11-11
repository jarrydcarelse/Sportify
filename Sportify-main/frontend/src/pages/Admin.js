import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import LoginModal from './LoginModal';

function Admin() {
    // State to manage products, filtered products, selected product for editing, etc.
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginModalVisible, setLoginModalVisible] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [orders, setOrders] = useState([]);
    const productsPerPage = 4;

    // Fetch products and orders when the component mounts
    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    // Function to fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Function to fetch orders from the API
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Handle search input to filter products based on query
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Handle adding a new product
    const handleAddProduct = async (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('image', imageFile);

            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Handle editing an existing product
    const handleEditProduct = async (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            if (imageFile) formData.append('image', imageFile);

            await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchProducts();
            setIsEditing(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    // Handle deleting a product
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle click on edit button to enable editing mode
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    // Handle form close action to reset editing state
    const handleFormClose = () => {
        setIsEditing(false);
        setSelectedProduct(null);
    };

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle closing of the login modal
    const handleLoginClose = () => {
        setLoginModalVisible(false);
    };

    // Handle successful login to set authentication state
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setLoginModalVisible(false);
    };

    // Product form component for adding/editing products
    const ProductForm = ({ product, onClose, onSave }) => {
        const [formData, setFormData] = useState({
            name: '',
            price: '',
            description: '',
        });

        useEffect(() => {
            if (product) {
                setFormData(product);
            }
        }, [product]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleImageChange = (e) => {
            setImageFile(e.target.files[0]);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
        };

        return (
            <div className="product-form">
                <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        );
    };

    // Calculate the current products to be displayed based on pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div>
            {/* Login modal display */}
            {loginModalVisible && (
                <LoginModal
                    onClose={handleLoginClose}
                    onLogin={handleLoginSuccess}
                />
            )}
            {/* Main admin content display based on authentication status */}
            {isAuthenticated ? (
                <>
                    <header className="products-header">
                        <input
                        style={{ margin: 0 }}
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            
                        />
                    </header>
                    {/* Display product form if in editing mode */}
                    {isEditing && (
                        <ProductForm
                            product={selectedProduct}
                            onClose={handleFormClose}
                            onSave={selectedProduct ? handleEditProduct : handleAddProduct}
                        />
                    )}
                    <div className="products-container">
                        {/* Display products */}
                        {currentProducts.map(product => (
                            <div key={product._id} className="product-block">
                                <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <span>{product.name}</span>
                                    <button onClick={() => handleEditClick(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        {/* Display add new product block */}
                        {!isEditing && (
                            <div className="product-block add-product-block" onClick={() => setIsEditing(true)}>
                                <span>Add New Product</span>
                            </div>
                        )}
                    </div>
                    {/* Pagination controls */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                            <button key={i + 1} onClick={() => paginate(i + 1)}>{i + 1}</button>
                        ))}
                    </div>
                    {/* Orders section */}
                    <div className="orders-section">
                        <h2>Orders</h2>
                        <div className="orders-container">
                            {orders.map(order => (
                                <div key={order._id} className="order-block">
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>Total Price:</strong> R{order.totalPrice.toFixed(2)}</p>
                                    <div>
                                        <strong>Items:</strong>
                                        {order.items.map(item => (
                                            <div key={item.product._id}>
                                                <p>Product: {item.product.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: R{item.product.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div>Please log in to view the admin content.</div>
            )}
        </div>
    );
}

export default Admin;
