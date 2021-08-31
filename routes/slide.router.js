const express = require('express');
const slideController = require('../controllers/slide.controller');
const router = express.Router();
const SlideController = require('../controllers/slide.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(SlideController.getSlide));
router.put('/', authenticationMiddleware, awaitHandlerFactory(SlideController.updateSlide));
router.post('/',authenticationMiddleware , awaitHandlerFactory(SlideController.createSlide));
router.delete('/:id',authenticationMiddleware, awaitHandlerFactory(SlideController.deleteSlide));
router.get('/error', awaitHandlerFactory(slideController.requestError));
module.exports = router;