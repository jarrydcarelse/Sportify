const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router instance
const Order = require('../models/Order'); // Import the Order model

// GET endpoint to fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product'); // Find all orders and populate the product details for each item
        res.status(200).json(orders); // Respond with the array of orders in JSON format
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors and respond with an error message
    }
});

// POST endpoint to add a new order
router.post('/', async (req, res) => {
    try {
        const { items, totalPrice } = req.body; // Destructure items and totalPrice from the request body
        const newOrder = new Order({ items, totalPrice }); // Create a new Order instance with the provided data
        await newOrder.save(); // Save the new order to the database
        res.status(201).json(newOrder); // Respond with the newly created order in JSON format
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle validation errors or other issues and respond with an error message
    }
});

module.exports = router; // Export the router for use in other parts of the application
