const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getCategories);
router.post('/category', auth, authAdmin, categoryController.createCategory);
router.delete('/category/:id', auth, authAdmin, categoryController.deleteCategory);
router.put('/category/:id', auth, authAdmin, categoryController.updateCategory);

module.exports = router;