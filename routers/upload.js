const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const uploadController = require('../controllers/uploadController');

// Set config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

router.post('/upload', uploadController.uploadImage);
router.post('/destroy', uploadController.destroyImage);

module.exports = router;
