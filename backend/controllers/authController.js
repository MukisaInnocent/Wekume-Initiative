const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        // Validate required fields
        if (!fullname || !email || !password) {
            return res.status(400).json({
                error: 'Please provide fullname, email, and password'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create user (password will be hashed by the hook)
        const user = await User.create({
            fullname,
            email,
            password_hash: password, // Will be hashed by beforeCreate hook
            role: role || 'viewer'
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: user.toJSON() // This will exclude password_hash
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if user is active
        if (!user.is_active) {
            return res.status(401).json({ error: 'Account is inactive' });
        }

        // Validate password
        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        // req.user is set by auth middleware
        res.json({ user: req.user.toJSON() });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullname, email } = req.body;
        const user = req.user;

        if (fullname) user.fullname = fullname;
        if (email && email !== user.email) {
            // Check if new email is already taken
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            user.email = email;
        }

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: user.toJSON()
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'Please provide current password and new password'
            });
        }

        // Validate current password
        const isValidPassword = await user.validatePassword(currentPassword);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Update password (will be hashed by beforeUpdate hook)
        user.password_hash = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
};
