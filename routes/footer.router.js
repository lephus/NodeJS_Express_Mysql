const express = require('express');
const slideController = require('../controllers/slide.controller');
const router = express.Router();
const FooterController = require('../controllers/footer.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(FooterController.getFooter));
// manager
router.get('/type-footer', authenticationMiddleware, awaitHandlerFactory(FooterController.managerGetTypeFooter))
router.put('/type-footer', authenticationMiddleware, awaitHandlerFactory(FooterController.managerUpdateTypeFooter))
router.get('/footer', authenticationMiddleware, awaitHandlerFactory(FooterController.managerGetFooter))
router.post('/footer', authenticationMiddleware, awaitHandlerFactory(FooterController.managerInsertFooter));
router.delete('/:id', authenticationMiddleware, awaitHandlerFactory(FooterController.managerDeleteFooter));
router.put('/footer', authenticationMiddleware, awaitHandlerFactory(FooterController.managerUpdateFooter))

module.exports = router;