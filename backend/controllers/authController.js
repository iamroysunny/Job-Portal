const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "60d" }
    );
};

// @desc Register new user
exports.register = async (req, res, next) => {

    try {

        console.log("REGISTER BODY:", req.body);

        const {
            name,
            email,
            password,
            avatar,
            role
        } = req.body || {};

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            avatar,
            role
        });

        console.log("USER CREATED:", user);

        // Response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id),
            companyName: user.companyName || "",
            companyLogo: user.companyLogo || "",
            companyDescription: user.companyDescription || "",
            resume: user.resume || "",
        });

    } catch (error) {

        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// @desc Login user
exports.login = async (req, res, next) => {

    try {

        const { email, password } = req.body || {};

        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);

        // Check email/password
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        console.log("FOUND USER:", user);

        // User not found
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Match password
        const isMatch = await user.matchPassword(password);

        console.log("PASSWORD MATCH:", isMatch);

        // Invalid password
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Success response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            avatar: user.avatar || "",
            companyName: user.companyName || "",
            companyLogo: user.companyLogo || "",
            companyDescription: user.companyDescription || "",
            resume: user.resume || "",
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// @desc Get logged-in user
exports.getMe = async (req, res, next) => {

    try {

        res.json(req.user);

    } catch (error) {

        console.log(error);

        next(error);
    }
};