// Import required packages
const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
require("dotenv").config(); // Load environment variables from .env

const Todo = require('./Model/model')

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URL}/tododb`)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((e) => console.log("❌ MongoDB connection error:", e));

// Define routes
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      data: req.body.data,
    });
    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
   return res.json(todos);
  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
});


// ✏️ UPDATE – Update Todo by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { data: req.body.data },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🗑 DELETE – Delete Todo by ID
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Use router
app.use('/tododb', router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
