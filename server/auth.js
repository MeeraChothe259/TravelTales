const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'traveltales_secret_123';

// Login or Register via email
router.post('/login', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        // 1. Check if user exists
        let userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        let user;

        if (userResult.rows.length === 0) {
            // 2. Register new user automatically if not found
            console.log("Registering new user via email:", email);
            const insertResult = await db.query(
                'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
                [email, email.split('@')[0]] // Use part of email as default name
            );
            user = insertResult.rows[0];
        } else {
            user = userResult.rows[0];
        }

        // 3. Generate JWT
        const sessionToken = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token: sessionToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture || null
            }
        });

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).json({ success: false, message: "Server error during authentication" });
    }
});

module.exports = router;
