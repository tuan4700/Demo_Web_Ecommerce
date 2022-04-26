const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/products', productController.createProducts);
router.delete('/delete_product/:id', productController.deleteProducts);
router.put('/edit_product/:id', productController.updateProducts);

module.exports = router;