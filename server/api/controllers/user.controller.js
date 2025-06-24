const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
});

exports.createAccount = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!password || !confirmPassword || password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Account created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.accountLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '90d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


// Forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("User not found");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        user.resetToken = token;
        user.tokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        // const link = `https://tech-byte-chennai.vercel.app/reset-password/${token}`;
        const link = `http://localhost:4200/resetpassword/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Password Reset",
            html: `<p>Click <a href="${link}">here</a> to reset your password</p>`
        });

        res.status(200).json("Password reset link sent to email");
    } catch (err) {
        res.status(400).send("Server error:", err);
    }
}

// Reset password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, resetToken: token, tokenExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).send("Invalid or expired token");

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.tokenExpiry = null;
        await user.save();

        res.send("Password reset successful");
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}