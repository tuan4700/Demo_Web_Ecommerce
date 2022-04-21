const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const paymentController = require('../controllers/paymentController');

router.get('/payment', auth, authAdmin, paymentController.getPayments);
router.post('/payment', auth, paymentController.createPayments);

module.exports = router;