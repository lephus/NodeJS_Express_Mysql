const IntroduceModel = require('../models/introduce.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Introduce Controller
 ******************************************************************************/
class IntroduceController {
    getIntroduce = async (req, res, next) => {
        let introduce = await IntroduceModel.select();
        res.send(introduce);
    };
    updateIntroduce = async (req, res, next) => {
        let introduce = await IntroduceModel.update(req.body);
        // res.status(200).json({ msg: 'update successfully'});
        let introduce = await IntroduceModel.select();
        res.send(introduce);
    };
}

module.exports = new IntroduceController;