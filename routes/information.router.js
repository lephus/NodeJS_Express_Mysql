const express = require('express');
const router = express.Router();
const InformationController = require('../controllers/information.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');



router.get('/', awaitHandlerFactory(InformationController.getInformation));
router.post('/', authenticationMiddleware, awaitHandlerFactory(InformationController.insertInformation));
router.put('/', authenticationMiddleware, awaitHandlerFactory(InformationController.updateInformation));
router.delete('/:id', authenticationMiddleware, awaitHandlerFactory(InformationController.deleteInformation));

module.exports = router;