const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Define the schema for a product
const productSchema = new mongoose.Schema({
    name: {
        type: String, // The name of the product
        required: true, // Name is required
    },
    price: {
        type: Number, // The price of the product
        required: true, // Price is required
    },
    description: {
        type: String, // The description of the product
        required: true, // Description is required
    },
    imageUrl: {
        type: String, // The URL of the product image
        required: true, // Image URL is required
    },
    createdAt: {
        type: Date, // The date when the product was created
        default: Date.now, // Default to the current date and time
    },
});

// Export the Product model based on the productSchema
module.exports = mongoose.model('Product', productSchema);
