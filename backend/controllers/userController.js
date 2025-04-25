import validator from 'validator';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Helper to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required ❗' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format ✉️' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password ❌' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password ❌' });
        }

        const token = createToken(user._id);

        res.status(200).json({
            message: 'Login successful ✅',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name, 
            },
        });
    } catch (error) {
        console.error("💥 [Login Error]:", error.message);
        res.status(500).json({ success: false, message: 'Something went wrong on the server.' });
    }
};


// Route for user registration 
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "⚠️ All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "❌ Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "🔐 Password must be at least 6 characters" });
        }

        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "👤 User already exists" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        console.log(`✅ [Register] New user registered: ${user.email}`);

        res.status(201).json({
            success: true,
            message: "🎉 Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("💥 [Register Error]:", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


// Route for admin login
import jwt from 'jsonwebtoken';
import validator from 'validator';

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic input validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "⚠️ Email and password are required." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "❌ Invalid email format." });
        }

        // Check credentials against env
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email }, // no role here
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            console.log(`🔐 [Admin Login] Logged in as admin: ${email}`);

            return res.status(200).json({
                success: true,
                message: "🟢 Admin login successful!",
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "❌ Invalid admin credentials."
            });
        }
    } catch (error) {
        console.error("💥 [Admin Login Error]:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Exporting the functions
export { loginUser, registerUser, adminLogin };


