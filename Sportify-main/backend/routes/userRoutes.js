const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router instance
const User = require('../models/User'); // Import the User model

// GET endpoint to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.status(200).json(users); // Respond with the array of users in JSON format
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle any errors and respond with an error message
    }
});

// POST endpoint to register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body; // Destructure user data from request body
        const newUser = new User({ name, email, password }); // Create a new User instance
        await newUser.save(); // Save the new user to the database
        res.status(201).json({ message: 'User created successfully!' }); // Respond with a success message
    } catch (error) {
        res.status(400).json({ error: 'Error creating user.' }); // Handle validation errors or other issues and respond with an error message
    }
});

// POST endpoint for user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure email and password from request body
        // Check if user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' }); // Respond with an error if user is not found
        }
        // Check if the provided password matches the user's password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password.' }); // Respond with an error if password is incorrect
        }
        // If user and password are correct, send success response with user information
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(400).json({ error: 'Error logging in.' }); // Handle any errors and respond with an error message
    }
});

module.exports = router; // Export the router for use in other parts of the application
