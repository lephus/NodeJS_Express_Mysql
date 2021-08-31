const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
const { Admin } = require('../utils/userRoles.utils');


router.post('/login', validateLogin, awaitHandlerFactory(AdminController.adminLogin));
router.get('/all', authenticationMiddleware, awaitHandlerFactory(AdminController.getAllAdmin));
router.get('/:id', authenticationMiddleware, awaitHandlerFactory(AdminController.getAdminById));
router.post('/create', authenticationMiddleware, awaitHandlerFactory(AdminController.createAdmin));
router.put('/update', authenticationMiddleware, awaitHandlerFactory(AdminController.updateAdmin));
router.put('/update-password', authenticationMiddleware, awaitHandlerFactory(AdminController.adminUpdatePassword))
router.delete('/:id', authenticationMiddleware, awaitHandlerFactory(AdminController.deleteAdmin));

module.exports = router;