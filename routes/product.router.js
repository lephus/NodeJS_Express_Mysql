const express = require('express');
const slideController = require('../controllers/slide.controller');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(ProductController.getAllProduct));
router.get('/:id', awaitHandlerFactory(ProductController.getProductById));
router.post('/', authenticationMiddleware, awaitHandlerFactory(ProductController.createProduct));
router.delete('/:id',authenticationMiddleware, awaitHandlerFactory(ProductController.deleteProduct));
router.put('/', authenticationMiddleware, awaitHandlerFactory(ProductController.updateProduct))

module.exports = router;