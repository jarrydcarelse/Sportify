const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router instance
const Product = require('../models/Product'); // Import the Product model
const multer = require('multer'); // Import multer for file upload handling
const path = require('path'); // Import path for file path manipulation

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename for uploaded files
    },
});

const upload = multer({ storage }); // Create multer middleware using the storage configuration

// GET endpoint to fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Retrieve all products from the database
        res.status(200).json(products); // Respond with the array of products in JSON format
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors and respond with an error message
    }
});

// POST endpoint to add a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description } = req.body; // Destructure product data from request body
        const imageUrl = req.file.filename; // Get the filename of the uploaded image
        const newProduct = new Product({ name, price, description, imageUrl }); // Create a new Product instance
        await newProduct.save(); // Save the new product to the database
        res.status(201).json(newProduct); // Respond with the newly created product in JSON format
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle validation errors or other issues and respond with an error message
    }
});

// PUT endpoint to update an existing product
router.put('/:id', async (req, res) => {
    try {
        const { name, price, description } = req.body; // Destructure updated product data from request body
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // Find product by ID and update its fields
            { name, price, description }, // New values to update
            { new: true } // Return the updated product after the update operation
        );
        res.status(200).json(updatedProduct); // Respond with the updated product in JSON format
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle validation errors or other issues and respond with an error message
    }
});

// DELETE endpoint to delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id); // Find product by ID and delete it
        res.status(200).json({ message: 'Product deleted successfully' }); // Respond with a success message
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle any errors and respond with an error message
    }
});

module.exports = router; // Export the router for use in other parts of the application
