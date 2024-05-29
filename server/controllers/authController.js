const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
    try {
        console.log(`req is: ${req}`)
        const { username, email, password } = req.body;

        const isPresent = await User.findOne({ email });
        if (isPresent) return res.status(400).json({ error: "User already present with this email." });

        const user = await User.create({ username, email, password });

        const token = jwt.sign({ userId: user.email, role: user.is_admin },  process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.login = async (req, res) => {
    try {
        console.log(`inside here`)
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.is_admin },  process.env.JWT_SECRET, { expiresIn: "24h" });
        console.log(`token ${token}`)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({
            message: "User logged in successfully", success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            // return res.status(404).json({ error: "User not found." });
            throw new ApiError(404, "User not found!");
        }
        res.json({
            user: { email: user.email, name: user.name },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
};