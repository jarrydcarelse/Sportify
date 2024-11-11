const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Define the schema for a user
const UserSchema = new mongoose.Schema({
    name: {
        type: String, // The name of the user
        required: true, // Name is required
    },
    email: {
        type: String, // The email address of the user
        required: true, // Email is required
        unique: true, // Email must be unique
    },
    password: {
        type: String, // The password of the user
        required: true, // Password is required
    },
});

// Export the User model based on the UserSchema
module.exports = mongoose.model('User', UserSchema);
