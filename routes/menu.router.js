const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');
// const auth = require('../middleware/auth.middleware');
// const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(MenuController.getMenu));

module.exports = router;