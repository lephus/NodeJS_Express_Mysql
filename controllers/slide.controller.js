const SlideModel = require('../models/slide.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Slide Controller
 ******************************************************************************/
class SlideController {
    getSlide = async (req, res, next) => {
        let SlideList = await SlideModel.select();
        res.send(SlideList);
    };


    updateSlide = async (req, res, next) => {
        let result = await SlideModel.update(req.body);
        // res.status(200).json({ msg: 'insert successfully'});
        let SlideList = await SlideModel.select();
        res.send(SlideList);
    };

    requestError = async (req, res, next) => {
        res.status(500).json({ msg: 'ok successfully'});
    };

    createSlide =  async (req, res, next) => {
        const slide_image = req.body
        let tmp = await SlideModel.create(slide_image);
        let SlideList = await SlideModel.select();
        res.send(SlideList);
    };

    deleteSlide = async (req, res, next) => {
        const { id: id } = req.params
        let tmp = await SlideModel.delete(id);
        let SlideList = await SlideModel.select();
        res.send(SlideList);
    };
}

module.exports = new SlideController;