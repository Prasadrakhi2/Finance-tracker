const express = require('express');
const fs = require('fs');
const path = require('path');
const {protect} = require("../middleware/authMiddleware")

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const {registerUser, loginUser, getUserInfo} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getuser", protect, getUserInfo);


router.post("/upload-image", upload.single("image"), (req, res) =>{
    if(!req.file){
        return res.status(404).json({message:"no file uploded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
})

module.exports = router;