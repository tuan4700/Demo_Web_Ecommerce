const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/products', productController.createProducts);
router.delete('/products/:id', productController.deleteProducts);
router.put('/products/:id', productController.updateProducts);

module.exports = router;