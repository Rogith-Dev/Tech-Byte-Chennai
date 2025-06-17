const bcrypt = require('bcrypt');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

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

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

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