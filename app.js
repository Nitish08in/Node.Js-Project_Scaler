// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define your MongoDB schema and model here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// app.js
// ... (previous code)

const Post = require('./models/Post');

app.use(express.json());

// Create a new blog post
app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new Post({ title, content });
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all blog posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ... (other routes)

// ... (end of file)
