const express = require('express');
const slideController = require('../controllers/slide.controller');
const router = express.Router();
const NewFeedController = require('../controllers/newfeed.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(NewFeedController.getAllNewFeed));
router.get('/:id', awaitHandlerFactory(NewFeedController.getNewFeedById));
router.post('/', authenticationMiddleware, awaitHandlerFactory(NewFeedController.createNewFeed));
router.delete('/:id', authenticationMiddleware, awaitHandlerFactory(NewFeedController.deleteNewFeed));
router.put('/', authenticationMiddleware, awaitHandlerFactory(NewFeedController.updateNewFeed))
module.exports = router;