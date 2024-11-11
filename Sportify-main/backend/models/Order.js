const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Define the schema for an order
const orderSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
                ref: 'Product', // The name of the model to reference
                required: true, // The product reference is required
            },
            quantity: {
                type: Number, // The quantity of the product
                required: true, // Quantity is required
            },
        }
    ],
    totalPrice: {
        type: Number, // The total price of the order
        required: true, // Total price is required
    },
    createdAt: {
        type: Date, // The date when the order was created
        default: Date.now, // Default to the current date and time
    },
});

// Export the Order model based on the orderSchema
module.exports = mongoose.model('Order', orderSchema);
