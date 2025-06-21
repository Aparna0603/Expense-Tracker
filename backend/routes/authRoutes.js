const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");

// ✅ Only import if exists
const { protect } = require("../middleware/authMiddleware"); 
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo); // ✅ protect must be defined

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageURL });
});

module.exports = router;
