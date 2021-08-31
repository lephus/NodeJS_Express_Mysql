const express = require('express');
const router = express.Router();
const IntroduceController = require('../controllers/introduce.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');



router.get('/', awaitHandlerFactory(IntroduceController.getIntroduce));
router.put('/', authenticationMiddleware, awaitHandlerFactory(IntroduceController.updateIntroduce))
module.exports = router;