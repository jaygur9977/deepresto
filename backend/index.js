const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path=require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://test-user:997763@cluster1.jmtcmmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    username: String,
    mobileno: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, mobileno, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, mobileno, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Error registering user');
        }
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, 'secretkey');
            res.json({ token });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});


// Add this endpoint to server.js
app.get('/user', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'secretkey'); // Verify token
        const user = await User.findOne({ email: decoded.email }); // Find user by email
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Return user details (excluding password)
        res.json({
            username: user.username,
            email: user.email,
            mobileno: user.mobileno,
        });
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

const _dirname=path.resolve();


app.use(express.static(path.join(_dirname, "/app/dist")))
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname, "app", "dist", "index.html"));
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});