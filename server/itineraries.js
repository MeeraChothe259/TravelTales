const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'traveltales_secret_123';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Token invalid" });
        req.user = user;
        next();
    });
};

// Save an itinerary
router.post('/', authenticateToken, async (req, res) => {
    const { title, destination, plan_data } = req.body;
    const userId = req.user.id;

    if (!title || !destination || !plan_data) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const result = await db.query(
            'INSERT INTO itineraries (user_id, title, destination, plan_data) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, title, destination, JSON.stringify(plan_data)]
        );

        res.json({
            success: true,
            message: "Itinerary saved successfully",
            itinerary: result.rows[0]
        });
    } catch (error) {
        console.error("Save Itinerary Error:", error);
        res.status(500).json({ success: false, message: "Failed to save itinerary" });
    }
});

// Get user's itineraries
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query(
            'SELECT * FROM itineraries WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            success: true,
            itineraries: result.rows
        });
    } catch (error) {
        console.error("Get Itineraries Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch itineraries" });
    }
});

// Delete an itinerary
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await db.query(
            'DELETE FROM itineraries WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Itinerary not found" });
        }

        res.json({ success: true, message: "Itinerary deleted" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false, message: "Deletion failed" });
    }
});

module.exports = router;
