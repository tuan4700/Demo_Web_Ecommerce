const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/refresh_token', userController.refreshToken);
router.get('/info', auth, userController.getUser);


module.exports = router;