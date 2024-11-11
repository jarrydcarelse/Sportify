const express = require('express'); // Import the Express framework
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const cors = require('cors'); // Import CORS for handling cross-origin requests
const dotenv = require('dotenv'); // Import dotenv for environment variables
const multer = require('multer'); // Import multer for file uploads
const path = require('path'); // Import path for file paths

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Define the port number, default to 5000 if not specified in environment variables

app.use(express.json()); // Parse JSON bodies of incoming requests
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files statically

mongoose.connect(process.env.MONGO_URI, { // Connect to MongoDB using the provided URI from environment variables
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected')) // Log successful MongoDB connection
    .catch(err => console.log(err)); // Log any MongoDB connection errors

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the filename for uploaded files
    },
});

const upload = multer({ storage }); // Configure multer with the defined storage

// Import and use Product Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Import and use User Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Import and use Order Routes
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Start the server and log the port number
});
