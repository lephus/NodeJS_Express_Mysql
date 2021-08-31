const MenuModel = require('../models/menu.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              menu Controller
 ******************************************************************************/
class MenuController {
    getMenu = async (req, res, next) => {
        let MenuList = await MenuModel.select();
        res.send(MenuList);
    };
}

module.exports = new MenuController;