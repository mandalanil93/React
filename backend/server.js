// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define a Schema for storing form data
const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const FormData = mongoose.model('FormData', formSchema);

// API endpoint to save form data
app.post('/submit-form', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newFormData = new FormData({ firstName, lastName });
    await newFormData.save();
    res.status(200).send('Form data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving data: ' + error.message);
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
