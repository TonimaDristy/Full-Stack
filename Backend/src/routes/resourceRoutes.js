const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/authMiddleware"); 

// Download
router.get("/resources/download/:id", verifyToken, (req, res) => {
    res.json({
        message: `Download allowed for user ${req.user.id} and resource ${req.params.id}`,
    });
});

// Bookmark
router.post("/resources/bookmark/:id", verifyToken, (req, res) => {
    res.json({
        message: `Bookmark added by user ${req.user.id} for resource ${req.params.id}`,
    });
});

// Rate
router.post("/resources/rate/:id", verifyToken, (req, res) => {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be 1-5" });
    }
    res.json({
        message: `User ${req.user.id} rated resource ${req.params.id} with ${rating}`,
    });
});

module.exports = router;
